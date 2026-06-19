import { jsPDF } from 'jspdf';

export function generateRulebookPDF() {
  const pdf = new jsPDF();
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 25;
  const contentWidth = pageWidth - 2 * margin;
  let yPosition = margin;

  // Clean color scheme - minimal and professional
  const darkGray = [31, 41, 55];
  const mediumGray = [107, 114, 128];
  const lightGray = [209, 213, 219];
  const accentBlue = [59, 130, 246];

  // Helper to add page footer
  const addFooter = (pageNum: number) => {
    pdf.setFontSize(9);
    pdf.setTextColor(mediumGray[0], mediumGray[1], mediumGray[2]);
    pdf.setFont('helvetica', 'normal');
    pdf.text(`Page ${pageNum}`, pageWidth / 2, pageHeight - 15, { align: 'center' });
  };

  // Helper to check and add new page
  const checkNewPage = (requiredSpace: number, pageCounter: { count: number }) => {
    if (yPosition + requiredSpace > pageHeight - 30) {
      addFooter(pageCounter.count);
      pdf.addPage();
      pageCounter.count++;
      yPosition = margin;
      return true;
    }
    return false;
  };

  let pageCounter = { count: 1 };

  // ========== COVER PAGE ==========
  yPosition = 80;

  // Main Title
  pdf.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
  pdf.setFontSize(36);
  pdf.setFont('helvetica', 'bold');
  pdf.text('CodeSprint 2026', pageWidth / 2, yPosition, { align: 'center' });

  yPosition += 15;
  pdf.setFontSize(18);
  pdf.setFont('helvetica', 'normal');
  pdf.text('Official Rulebook', pageWidth / 2, yPosition, { align: 'center' });

  yPosition += 8;
  pdf.setDrawColor(accentBlue[0], accentBlue[1], accentBlue[2]);
  pdf.setLineWidth(0.5);
  pdf.line(pageWidth / 2 - 30, yPosition, pageWidth / 2 + 30, yPosition);

  yPosition += 30;

  // Event Info Table
  pdf.setFontSize(11);
  pdf.setTextColor(mediumGray[0], mediumGray[1], mediumGray[2]);
  pdf.setFont('helvetica', 'normal');

  const eventInfo = [
    ['Date', 'January 15, 2026'],
    ['Time', '10:00 AM - 9:00 PM'],
    ['Duration', '11 Hours'],
    ['Format', 'Online Hackathon'],
    ['Registration Fee', '₹350 per team']
  ];

  eventInfo.forEach(([label, value]) => {
    pdf.setFont('helvetica', 'bold');
    pdf.text(label + ':', margin + 10, yPosition);
    pdf.setFont('helvetica', 'normal');
    pdf.text(value, margin + 60, yPosition);
    yPosition += 10;
  });

  yPosition += 20;

  // Contact Information
  pdf.setFontSize(10);
  pdf.setTextColor(mediumGray[0], mediumGray[1], mediumGray[2]);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Event Coordinators', pageWidth / 2, yPosition, { align: 'center' });
  yPosition += 8;
  pdf.setFont('helvetica', 'normal');
  pdf.text('Syed Moinuddin: 8904281955', pageWidth / 2, yPosition, { align: 'center' });
  yPosition += 6;
  pdf.text('Usman: 9886481493', pageWidth / 2, yPosition, { align: 'center' });

  addFooter(pageCounter.count);

  // ========== PAGE 2: ELIGIBILITY & TEAM RULES ==========
  pdf.addPage();
  pageCounter.count++;
  yPosition = margin;

  // Section 1: Eligibility
  pdf.setFontSize(16);
  pdf.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
  pdf.setFont('helvetica', 'bold');
  pdf.text('1. Eligibility', margin, yPosition);
  yPosition += 3;
  pdf.setDrawColor(lightGray[0], lightGray[1], lightGray[2]);
  pdf.setLineWidth(0.3);
  pdf.line(margin, yPosition, pageWidth - margin, yPosition);
  yPosition += 12;

  pdf.setFontSize(10);
  pdf.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
  pdf.setFont('helvetica', 'normal');

  const eligibility = [
    'Open to all students, professionals, and tech enthusiasts worldwide',
    'No age restrictions or prior experience required',
    'Individual participation or team formation is allowed',
    'All skill levels are welcome'
  ];

  eligibility.forEach(item => {
    const lines = pdf.splitTextToSize(`• ${item}`, contentWidth - 5);
    pdf.text(lines, margin + 3, yPosition);
    yPosition += lines.length * 6;
  });

  yPosition += 15;

  // Section 2: Team Rules
  pdf.setFontSize(16);
  pdf.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
  pdf.setFont('helvetica', 'bold');
  pdf.text('2. Team Rules', margin, yPosition);
  yPosition += 3;
  pdf.line(margin, yPosition, pageWidth - margin, yPosition);
  yPosition += 12;

  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');

  const teamRules = [
    'Solo or teams of up to 4 members allowed',
    'Team leader must register with all member names during registration',
    'Team composition must be finalized before event start',
    'No team changes permitted after registration closes',
    'Registration fee of ₹350 covers the entire team'
  ];

  teamRules.forEach(item => {
    const lines = pdf.splitTextToSize(`• ${item}`, contentWidth - 5);
    pdf.text(lines, margin + 3, yPosition);
    yPosition += lines.length * 6;
  });

  yPosition += 15;

  // Section 3: Competition Rules
  pdf.setFontSize(16);
  pdf.setFont('helvetica', 'bold');
  pdf.text('3. Competition Rules', margin, yPosition);
  yPosition += 3;
  pdf.line(margin, yPosition, pageWidth - margin, yPosition);
  yPosition += 12;

  const competitionRules = [
    {
      title: 'Original Work',
      text: 'All submissions must be original work created during the 11-hour period. Pre-existing projects are not allowed. Use of open-source libraries and frameworks is permitted.'
    },
    {
      title: 'Time Constraint',
      text: 'Projects must be completed within 11 hours (10:00 AM - 9:00 PM). Late submissions will not be accepted.'
    },
    {
      title: 'Technology',
      text: 'Any programming language, framework, or technology stack is allowed.'
    },
    {
      title: 'Theme',
      text: 'Projects should align with the theme announced at the opening ceremony.'
    },
    {
      title: 'Submission',
      text: 'Submit source code, documentation, and demo through the official platform before deadline.'
    }
  ];

  competitionRules.forEach((rule, index) => {
    checkNewPage(30, pageCounter);
    
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'bold');
    pdf.text(`3.${index + 1} ${rule.title}`, margin + 3, yPosition);
    yPosition += 8;

    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    const lines = pdf.splitTextToSize(rule.text, contentWidth - 10);
    pdf.text(lines, margin + 3, yPosition);
    yPosition += lines.length * 6 + 6;
  });

  addFooter(pageCounter.count);

  // ========== PAGE 3: JUDGING & PRIZES ==========
  pdf.addPage();
  pageCounter.count++;
  yPosition = margin;

  // Section 4: Judging Criteria
  pdf.setFontSize(16);
  pdf.setFont('helvetica', 'bold');
  pdf.text('4. Judging Criteria', margin, yPosition);
  yPosition += 3;
  pdf.line(margin, yPosition, pageWidth - margin, yPosition);
  yPosition += 12;

  const criteria = [
    ['Innovation', '30%', 'Creativity and uniqueness of the solution'],
    ['Technical Implementation', '30%', 'Code quality, functionality, and complexity'],
    ['Design & UX', '20%', 'User interface and overall experience'],
    ['Presentation', '20%', 'Demo quality and documentation']
  ];

  pdf.setFontSize(10);
  criteria.forEach(([name, weight, desc]) => {
    pdf.setFont('helvetica', 'bold');
    pdf.text(`${name} (${weight})`, margin + 3, yPosition);
    yPosition += 6;
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(mediumGray[0], mediumGray[1], mediumGray[2]);
    pdf.text(desc, margin + 6, yPosition);
    yPosition += 10;
    pdf.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
  });

  yPosition += 10;

  // Section 5: Prizes
  pdf.setFontSize(16);
  pdf.setFont('helvetica', 'bold');
  pdf.text('5. Prizes & Recognition', margin, yPosition);
  yPosition += 3;
  pdf.line(margin, yPosition, pageWidth - margin, yPosition);
  yPosition += 12;

  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');

  const prizes = [
    'Grand Winner: Cash Prize + Certificate of Excellence',
    'All Participants: Certificate of Participation',
    'Networking opportunities with industry professionals',
    'Portfolio enhancement and valuable experience'
  ];

  prizes.forEach(prize => {
    pdf.text(`• ${prize}`, margin + 3, yPosition);
    yPosition += 7;
  });

  yPosition += 15;

  // Section 6: Code of Conduct
  pdf.setFontSize(16);
  pdf.setFont('helvetica', 'bold');
  pdf.text('6. Code of Conduct', margin, yPosition);
  yPosition += 3;
  pdf.line(margin, yPosition, pageWidth - margin, yPosition);
  yPosition += 12;

  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');

  const conduct = [
    'Treat all participants, judges, and organizers with respect',
    'No harassment or discrimination will be tolerated',
    'Collaborate ethically and fairly within your team',
    'Follow all event guidelines and organizer instructions',
    'Report concerns to coordinators immediately'
  ];

  conduct.forEach(item => {
    checkNewPage(15, pageCounter);
    const lines = pdf.splitTextToSize(`• ${item}`, contentWidth - 5);
    pdf.text(lines, margin + 3, yPosition);
    yPosition += lines.length * 6;
  });

  yPosition += 15;

  // Important Note
  pdf.setDrawColor(lightGray[0], lightGray[1], lightGray[2]);
  pdf.setLineWidth(0.5);
  pdf.rect(margin, yPosition, contentWidth, 20);
  
  pdf.setFontSize(9);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Important:', margin + 3, yPosition + 7);
  pdf.setFont('helvetica', 'normal');
  pdf.text('Violation of any rule may result in disqualification. Organizers hold final decision-making authority.', margin + 3, yPosition + 14);

  // Final message
  yPosition = pageHeight - 40;
  pdf.setFontSize(11);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
  pdf.text('Good luck and happy coding!', pageWidth / 2, yPosition, { align: 'center' });

  addFooter(pageCounter.count);

  // Save PDF
  pdf.save('CodeSprint-2026-Rulebook.pdf');
}
