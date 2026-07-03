// js/certificate.js
// Usage: generateCertificate({ name, course, date })

export function generateCertificate({ name, course, subtitle = '', date }) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
  const W = 297, H = 210;

  // Background gradient simulation
  doc.setFillColor(239, 246, 255);
  doc.rect(0, 0, W, H, 'F');

  // Decorative top band
  doc.setFillColor(26, 86, 219);
  doc.rect(0, 0, W, 18, 'F');

  // Decorative bottom band
  doc.setFillColor(249, 115, 22);
  doc.rect(0, H - 12, W, 12, 'F');

  // Outer border
  doc.setDrawColor(26, 86, 219);
  doc.setLineWidth(1.5);
  doc.rect(14, 22, W - 28, H - 38, 'S');

  // Header text in top band
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(255, 255, 255);
  doc.text('CHANDRAS EDU · courses.chandrashaker.in', W / 2, 12, { align: 'center' });

  // Certificate heading
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(28);
  doc.setTextColor(26, 86, 219);
  doc.text('Certificate of Completion', W / 2, 52, { align: 'center' });

  // Decorative line
  doc.setDrawColor(249, 115, 22);
  doc.setLineWidth(1);
  doc.line(80, 57, W - 80, 57);

  // Body
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(13);
  doc.setTextColor(75, 85, 99);
  doc.text('This is to certify that', W / 2, 75, { align: 'center' });

  // Name
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(26);
  doc.setTextColor(17, 24, 39);
  doc.text(name, W / 2, 95, { align: 'center' });

  // Underline name
  const nameW = doc.getTextWidth(name);
  doc.setDrawColor(26, 86, 219);
  doc.setLineWidth(0.5);
  doc.line(W / 2 - nameW / 2, 98, W / 2 + nameW / 2, 98);

  // Completion text
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(13);
  doc.setTextColor(75, 85, 99);
  doc.text('has successfully completed the course', W / 2, 112, { align: 'center' });

  // Course name
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(26, 86, 219);
  doc.text(course, W / 2, 127, { align: 'center' });

  if (subtitle) {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    doc.setTextColor(107, 114, 128);
    doc.text(subtitle, W / 2, 138, { align: 'center' });
  }

  // Date
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.setTextColor(156, 163, 175);
  const dateStr = date || new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
  doc.text(`Date of Completion: ${dateStr}`, W / 2, 158, { align: 'center' });

  // Signature
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(17, 24, 39);
  doc.text('Chandra Shaker', 65, 178);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(107, 114, 128);
  doc.text('Course Instructor', 65, 185);
  doc.text('chandrashaker.in', 65, 191);

  // Signature line
  doc.setDrawColor(209, 213, 219);
  doc.setLineWidth(0.5);
  doc.line(50, 175, 140, 175);

  // Bottom band text
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(255, 255, 255);
  doc.text('courses.chandrashaker.in  ·  Free Engineering & Professional Courses', W / 2, H - 5, { align: 'center' });

  doc.save(`Certificate-${name.replace(/\s+/g, '_')}-${course.replace(/\s+/g, '_')}.pdf`);
}

export function getShareableLink(courseId, userName) {
  return `https://courses.chandrashaker.in/certificate.html?course=${encodeURIComponent(courseId)}&user=${encodeURIComponent(userName)}&date=${encodeURIComponent(new Date().toLocaleDateString('en-IN'))}`;
}
