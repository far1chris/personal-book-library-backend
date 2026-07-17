// ref: 37aa88161f
import { useState, useEffect } from 'react';

export default function useAuth() {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [authModal, setAuthModal] = useState(null);

  // Auth Guard checking on mount
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (!storedToken) {
      setAuthModal({
        isOpen: true,
        type: 'info',
        message: 'กรุณาเข้าสู่ระบบก่อนใช้งาน',
        onClose: () => {
          setAuthModal(null);
          setToken(null);
        }
      });
    }
  }, []);

  const login = async (username, password) => {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
    }

    localStorage.setItem('token', data.token);
    setToken(data.token);
    return data.token;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setAuthModal(null);
  };

  const triggerLogoutConfirm = () => {
    setAuthModal({
      isOpen: true,
      type: 'confirm',
      message: 'คุณแน่ใจว่าต้องการออกจากระบบใช่หรือไม่?',
      isDanger: false,
      confirmText: 'ออกจากระบบ',
      cancelText: 'ยกเลิก',
      onConfirm: () => {
        logout();
      },
      onCancel: () => setAuthModal(null)
    });
  };

  return {
    token,
    authModal,
    setAuthModal,
    login,
    logout,
    triggerLogoutConfirm
  };
}
