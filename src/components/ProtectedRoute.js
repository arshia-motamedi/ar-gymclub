// ProtectedRoute.js 
import React, { useEffect, useState } from 'react'; 
import { Navigate } from 'react-router-dom'; 
import { useUserContext } from '../Register/UserContext'; 
 
const ProtectedRoute = ({ children }) => { 
  const { user } = useUserContext(); // گرفتن اطلاعات کاربر از Context 
  const [redirect, setRedirect] = useState(false); // برای مدیریت ریدایرکت 
 
  useEffect(() => { 
    if (!user) { 
      setRedirect(true); // اگر کاربر وارد نشده، ریدایرکت می‌کنیم 
    } 
  }, [user]); // فقط وقتی که وضعیت user تغییر کند، اجرا شود 
 
  if (redirect) { 
    // به صفحه لاگین هدایت می‌کنیم و پیامی به آن ارسال می‌کنیم 
    return <Navigate to="/loginsignup" state={{ alertMessage: 'Please log in first to access the Products section.' }} />; 
  } 
 
  return children; // اگر کاربر وارد شده باشد، محتوای ProtectedRoute نمایش داده می‌شود 
}; 
 
export default ProtectedRoute;