@@ .. @@
  const quickLinks = [
    { name: 'Drawing Competition', href: '#drawing-competition' },
    { name: 'Teacher Awards', href: '#teacher-awards' },
    { name: 'Timeline', href: '#timeline' },
    { name: 'Prizes', href: '#prizes' },
+    { name: 'Results', href: '/results' },
+    { name: 'Vote', href: '/vote' },
    { name: 'Contact', href: '#contact' }
  ];

  const scrollToSection = (href) => {
-    const element = document.querySelector(href);
-    if (element) {
-      element.scrollIntoView({ behavior: 'smooth' });
+    if (href.startsWith('/')) {
+      // Handle route navigation
+      window.location.href = href;
+    } else {
+      // Handle section scrolling
+      const element = document.querySelector(href);
+      if (element) {
+        element.scrollIntoView({ behavior: 'smooth' });
+      }
     }
   };