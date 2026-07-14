// ref: 37aa88161f
import React, { useState, useEffect, useRef, useMemo } from 'react';
import Login from './components/Login';
import BookForm from './components/BookForm';
import BookList from './components/BookList';

export default function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isFetched, setIsFetched] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
    publishedYear: '',
    genre: '',
  });

  // Refs
  const titleInputRef = useRef(null);
  const prevBooksLength = useRef(0);

  // Auth Guard Effect
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (!storedToken) {
      alert('กรุณาเข้าสู่ระบบก่อนใช้งาน');
      setToken(null);
    }
  }, []);

  // Fetch Books on Mount/Token Update
  useEffect(() => {
    if (token) {
      const fetchBooks = async () => {
        setLoading(true);
        setError(null);
        try {
          const response = await fetch('/api/books', {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });

          if (response.status === 401) {
            handleLogout();
            return;
          }

          if (!response.ok) {
            throw new Error('ไม่สามารถโหลดข้อมูลหนังสือจากเซิร์ฟเวอร์ได้');
          }

          const data = await response.json();
          prevBooksLength.current = data.length;
          setBooks(data);
          setIsFetched(true);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchBooks();
    }
  }, [token]);

  // Update Effect: Watch books array changes (add or delete)
  useEffect(() => {
    if (!isFetched) return;

    if (books.length > prevBooksLength.current) {
      alert('เพิ่มหนังสือเรียบร้อยแล้วนะ!');
    } else if (books.length < prevBooksLength.current) {
      alert('ลบหนังสือเรียบร้อยแล้ว!');
    }
    prevBooksLength.current = books.length;
  }, [books, isFetched]);

  // useMemo for book count calculation
  const totalBooksCount = useMemo(() => {
    return books.length;
  }, [books]);

  // Form input changes handler
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Login handler
  const handleLoginSuccess = (newToken) => {
    setToken(newToken);
  };

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setBooks([]);
    setIsFetched(false);
  };

  // Submit new book handler
  const handleAddBook = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.author) {
      setError('กรุณาระบุชื่อหนังสือและผู้แต่ง');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 401) {
        handleLogout();
        return;
      }

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'การเพิ่มหนังสือล้มเหลว');
      }

      const newBook = await response.json();
      setBooks((prev) => [newBook, ...prev]);

      // Reset Form Data
      setFormData({
        title: '',
        author: '',
        description: '',
        publishedYear: '',
        genre: '',
      });

      // Autofocus using useRef
      if (titleInputRef.current) {
        titleInputRef.current.focus();
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Delete book handler
  const handleDeleteBook = async (id) => {
    if (!window.confirm('คุณแน่ใจว่าต้องการลบหนังสือเล่มนี้?')) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/books/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        handleLogout();
        return;
      }

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'การลบหนังสือล้มเหลว');
      }

      setBooks((prev) => prev.filter((book) => book._id !== id));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Render Login page if token is missing
  if (!token) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased">
      {/* Header section */}
      <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-tr from-emerald-500 to-teal-500 p-2.5 rounded-xl text-slate-950">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                Personal Book Library
              </h1>
              <p className="text-xs text-slate-400">ระบบจัดการคลังหนังสือส่วนตัว</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden sm:block text-right">
              <span className="text-xs text-slate-500 uppercase tracking-wider block">
                จำนวนหนังสือรวม
              </span>
              <span className="text-sm font-bold text-slate-300">
                {totalBooksCount} เล่ม
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="text-xs font-semibold text-slate-300 hover:text-rose-400 bg-slate-800 hover:bg-rose-500/10 border border-slate-700 hover:border-rose-500/30 px-4 py-2.5 rounded-xl transition duration-200"
            >
              ออกจากระบบ
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {error && (
          <div className="mb-8 p-4 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-xl text-sm flex justify-between items-center">
            <span>{error}</span>
            <button onClick={() => setError(null)} className="text-slate-400 hover:text-slate-200 font-bold">
              &times;
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left panel: Add Form */}
          <div className="lg:col-span-1 lg:sticky lg:top-24">
            <BookForm
              formData={formData}
              onChange={handleFormChange}
              onSubmit={handleAddBook}
              titleInputRef={titleInputRef}
              loading={loading}
            />
          </div>

          {/* Right panel: Book List */}
          <div className="lg:col-span-2">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-slate-200 flex items-center gap-2">
                รายการหนังสือทั้งหมด
                <span className="px-2 py-0.5 text-xs bg-slate-800 text-slate-400 rounded-md">
                  {totalBooksCount}
                </span>
              </h2>
            </div>
            <BookList books={books} onDelete={handleDeleteBook} loading={loading} />
          </div>
        </div>
      </main>
    </div>
  );
}
