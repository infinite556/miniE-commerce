import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  // بنستدعي الـ Router عشان نقدر نحول المستخدم لصفحات تانية
  const router = inject(Router);

  // بنفحص هل في توكن متخزن في الـ Local Storage (دليل إنه عامل تسجيل دخول)
  const token = localStorage.getItem('token');

  if (token) {
    return true; // مسموح له يدخل الصفحة
  } else {
    // لو مفيش توكن، بنحوله لصفحة تسجيل الدخول
    router.navigate(['/login']); 
    return false; // ممنوع يدخل الصفحة
  }
};