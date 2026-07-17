// ref: 37aa88161f
import { useState, useEffect, useRef } from 'react';

export default function useBooks(token, logout) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isFetched, setIsFetched] = useState(false);
  const [booksModal, setBooksModal] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
    publishedYear: '',
    genre: '',
  });

  const titleInputRef = useRef(null);
  const prevBooksLength = useRef(0);

  // Fetch books when token changes
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
            logout();
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
    } else {
      setBooks([]);
      setIsFetched(false);
    }
  }, [token]);

  // Watch books list updates for notification alerts
  useEffect(() => {
    if (!isFetched) return;

    if (books.length > prevBooksLength.current) {
      setBooksModal({
        isOpen: true,
        type: 'info',
        message: 'เพิ่มหนังสือเรียบร้อยแล้วนะ!',
        onClose: () => setBooksModal(null)
      });
    } else if (books.length < prevBooksLength.current) {
      setBooksModal({
        isOpen: true,
        type: 'info',
        message: 'ลบหนังสือเรียบร้อยแล้ว!',
        onClose: () => setBooksModal(null)
      });
    }
    prevBooksLength.current = books.length;
  }, [books, isFetched]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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
        logout();
        return;
      }

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'การเพิ่มหนังสือล้มเหลว');
      }

      const newBook = await response.json();
      setBooks((prev) => [newBook, ...prev]);

      setFormData({
        title: '',
        author: '',
        description: '',
        publishedYear: '',
        genre: '',
      });

      if (titleInputRef.current) {
        titleInputRef.current.focus();
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBook = (id) => {
    setBooksModal({
      isOpen: true,
      type: 'confirm',
      message: 'คุณแน่ใจว่าต้องการลบหนังสือเล่มนี้หรือไม่?',
      isDanger: true,
      confirmText: 'ยืนยันลบ',
      onConfirm: async () => {
        setBooksModal(null);
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
            logout();
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
      },
      onCancel: () => setBooksModal(null)
    });
  };

  return {
    books,
    loading,
    error,
    setError,
    formData,
    titleInputRef,
    booksModal,
    setBooksModal,
    handleFormChange,
    handleAddBook,
    handleDeleteBook
  };
}
