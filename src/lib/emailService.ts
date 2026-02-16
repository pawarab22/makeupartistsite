export interface EnquiryReplyEmailParams {
    to_name: string;
    to_email: string;
    occasion: string;
    original_message: string;
    admin_reply: string;
    site_url: string;
}

/**
 * Opens a professional Gmail compose window with everything pre-filled.
 * This ensures the email is sent from your official account without needing any 3rd party settings.
 */
export function sendEnquiryReplyEmail(params: EnquiryReplyEmailParams) {
    const { to_name, to_email, occasion, admin_reply } = params;

    const subject = encodeURIComponent(`✨ Your ${occasion} Enquiry - Pooja's Aura Artistry`);

    const body = encodeURIComponent(
        `DEAR ${to_name.toUpperCase()},

Warm greetings from POOJA'S AURA ARTISTRY! 💄✨

Thank you for your inquiry regarding your ${occasion}. It would be an honor to help you look your absolute best on your special day.

--- OUR RESPONSE ---

${admin_reply}

----------------------------

✨ EXPLORE MORE:
🌐 Website: https://poojas-aura-artistry.vercel.app/
📸 Instagram-Page: https://www.instagram.com/makeover_by_pooja04?igsh=YXVnOTY5NmM3NDBv

I am happy to discuss any specific looks or requirements you have. Should you wish to proceed with the booking, please let me know.

Looking forward to creating magic for your celebration!

With Elegance & Grace,

POOJA KATE
Lead Artist | Pooja's Aura Artistry
📧 info.pooja.saura.artistry@gmail.com
✨ Your Beauty, My Artistry.
🖼️ Official Logo: https://poojas-aura-artistry.vercel.app/logo2.jpg`
    );

    // This opens a Gmail compose window with everything filled out.
    // The user just needs to click "Send".
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${to_email}&su=${subject}&body=${body}`;

    const newWindow = window.open(gmailUrl, '_blank');

    if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
        // Falls back to standard mailto if popup blocked
        window.location.href = `mailto:${to_email}?subject=${subject}&body=${body}`;
    }

    return { success: true };
}
