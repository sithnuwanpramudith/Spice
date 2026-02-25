/**
 * Normalizes a phone number for use with WhatsApp.
 * It removes all non-digit characters and ensures it starts with the 94 country code.
 * Handles formats like:
 * - 077 123 4567 -> 94771234567
 * - +94 77 123 4567 -> 94771234567
 * - 771234567 -> 94771234567
 * - 94771234567 -> 94771234567
 */
export const normalizeWhatsAppNumber = (phone: string): string => {
    // Remove all non-digit characters
    const digits = phone.replace(/\D/g, '');

    // If it starts with 94 and is the correct length (assuming 11-12 digits for LK), return it
    if (digits.startsWith('94') && digits.length >= 11) {
        return digits;
    }

    // If it starts with 0 (local format e.g. 077...), strip 0 and prepend 94
    if (digits.startsWith('0')) {
        return '94' + digits.slice(1);
    }

    // If it's a 9-digit number (e.g. 77...), prepend 94
    if (digits.length === 9) {
        return '94' + digits;
    }

    // Fallback: just return the digits
    return digits;
};

/**
 * Builds a WhatsApp URL that works well on desktop/web.
 * @param phone The raw phone number
 * @param message The message to pre-fill
 */
export const buildWhatsAppUrl = (phone: string, message: string): string => {
    const normalizedNumber = normalizeWhatsAppNumber(phone);
    const encodedMessage = encodeURIComponent(message);

    // Using web.whatsapp.com/send is more reliable for desktop than wa.me
    // but wa.me is better for mobile. We'll use the web.whatsapp.com for admin panel
    // as it's primarily used on desktop.
    return `https://web.whatsapp.com/send?phone=${normalizedNumber}&text=${encodedMessage}`;
};
