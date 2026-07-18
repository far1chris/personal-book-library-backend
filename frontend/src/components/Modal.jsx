// ref: 37aa88161f
import React from 'react';

export default function Modal({ 
  isOpen, 
  type, 
  message, 
  onConfirm, 
  onCancel, 
  onClose,
  confirmText = 'ยืนยัน',
  cancelText = 'ยกเลิก',
  isDanger = false
}) {
  if (!isOpen) return null;

  const isAddAction = message?.includes('เพิ่ม');
  
  // Dynamic styles for the icon wrapper container (Default to Red for warnings, deletions, errors, and logouts)
  let iconThemeClass = "bg-rose-50 border-rose-100 text-rose-600";
  if (isAddAction) {
    iconThemeClass = "bg-emerald-50 border-emerald-100 text-emerald-600";
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm transition-opacity"
        onClick={type === 'confirm' ? onCancel : onClose}
      ></div>

      {/* Modal Container */}
      <div className="relative bg-white border border-stone-200 p-6 rounded-2xl shadow-xl max-w-sm w-full mx-auto transition-all scale-100 z-10 font-sans">
        <div className="flex flex-col items-center text-center space-y-4">
          
          {/* Icon wrapper */}
          <div className={`w-12 h-12 rounded-full flex items-center justify-center border ${iconThemeClass}`}>
            {isDanger ? (
              // Trash Bin for Deletion
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            ) : message?.includes('ออกจากระบบ') ? (
              // Logout/Sign-out Icon
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            ) : (message?.includes('เรียบร้อย') || message?.includes('สำเร็จ')) ? (
              // Success Checkmark Icon for adding/deleting successfully
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              // General Info / Warning Icon (e.g. "กรุณาเข้าสู่ระบบก่อนใช้งาน")
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            )}
          </div>

          {/* Message */}
          <div className="space-y-1">
            <h3 className="font-serif font-bold text-stone-900 text-base">
              {type === 'confirm' ? 'ยืนยันการทำรายการ' : 'แจ้งเตือนระบบ'}
            </h3>
            <p className="text-stone-600 text-sm leading-relaxed">
              {message}
            </p>
          </div>

          {/* Buttons */}
          <div className="flex w-full gap-3 pt-2">
            {type === 'confirm' ? (
              <>
                <button
                  onClick={onCancel}
                  className="flex-1 bg-stone-100 hover:bg-stone-200 text-stone-700 font-medium py-2.5 rounded-xl transition text-sm border border-stone-200"
                >
                  {cancelText}
                </button>
                <button
                  onClick={onConfirm}
                  className="flex-1 bg-amber-700 hover:bg-amber-800 text-white font-semibold py-2.5 rounded-xl transition text-sm shadow-sm"
                >
                  {confirmText}
                </button>
              </>
            ) : (
              <button
                onClick={onClose}
                className="w-full bg-amber-700 hover:bg-amber-800 text-white font-semibold py-2.5 rounded-xl transition text-sm shadow-sm"
              >
                ตกลง
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
