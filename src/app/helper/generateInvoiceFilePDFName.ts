import moment from 'moment';

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
  // Define accepted date formats
  const formats = ['DD-MM-YYYY', 'DD/MM/YYYY', 'YYYY-MM-DD', 'YYYY/MM/DD', moment.ISO_8601];

  // Parse with moment
  let dateMoment = moment(invoiceDate, formats, true);
  if (!dateMoment.isValid()) {
    dateMoment = moment(); // fallback to current date
  }

  const monthYear = dateMoment.format('MMMYYYY'); // e.g., Sep2025

  // Helper: take first meaningful word and sanitize
  const sanitize = (str: string): string => {
    if (!str) return '';
    const ignoreWords = ['the', 'a', 'an', 'and'];
    const words = str.trim().split(/\s+/);
    let firstWord = words[0];
    if (ignoreWords.includes(firstWord.toLowerCase()) && words.length > 1) {
      firstWord = words[1];
    }
    return firstWord.replace(/[^a-zA-Z0-9]/g, '');
  };

  const safeCompany = sanitize(companyName) || 'Company';
  const safeClient = sanitize(clientName) || 'Client';

  return `${safeCompany} - ${safeClient} - ${monthYear}.pdf`;
}
