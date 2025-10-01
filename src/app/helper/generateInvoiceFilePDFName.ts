/**
 * Generate invoice PDF filename: Company - Client - MonYYYY.pdf
 * Example: "Ansh - Frankline - Sep2025.pdf"
 *
 * @param companyName Name of the company
 * @param clientName Name of the client
 * @param invoiceDate Date object or string
 * @returns string - safe filename
 */
export function generateInvoiceFilePDFName(
  companyName: string,
  clientName: string,
  invoiceDate: Date | string,
): string {
  const dateObj = typeof invoiceDate === 'string' ? new Date(invoiceDate) : invoiceDate;

  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const monthYear = `${monthNames[dateObj.getMonth()]}${dateObj.getFullYear()}`;

  // Helper: take first meaningful word and sanitize
  const sanitize = (str: string): string => {
    if (!str) return '';
    const ignoreWords = ['the', 'a', 'an', 'and']; // words to skip if first
    const words = str.trim().split(/\s+/); // split by any whitespace
    let firstWord = words[0];

    // If first word is generic, use the next one
    if (ignoreWords.includes(firstWord.toLowerCase()) && words.length > 1) {
      firstWord = words[1];
    }

    // Remove non-alphanumeric characters
    return firstWord.replace(/[^a-zA-Z0-9]/g, '');
  };

  const safeCompany = sanitize(companyName) || 'Company';
  const safeClient = sanitize(clientName) || 'Client';

  return `${safeCompany} - ${safeClient} - ${monthYear}.pdf`;
}
