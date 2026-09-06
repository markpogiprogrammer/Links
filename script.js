/**
 * Linktree Profile Page Configuration & Interactivity
 * Author: Mark Oliver Quiazon
 */

// Easy Configuration Object - Update your links and information anytime!
const PROFILE_CONFIG = {
  name: "Mark Oliver Quiazon",
  handle: "@qznmark",
  bio: "Software QA Tester & Fitness Creator",
  links: {
    portfolio: "https://markquiazon.vercel.app",
    github: "https://github.com/markpogiprogrammer",
    linkedin: "https://www.linkedin.com/in/mark-oliver-quiazon-b65588290",
    tiktok: "https://www.tiktok.com/@qznmark",
    instagram: "https://www.instagram.com/qznmark",
    facebook: "https://www.facebook.com/mark6god"
  }
};

document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const shareBtn = document.getElementById('shareBtn');
  const qrBtn = document.getElementById('qrBtn');
  const shareModal = document.getElementById('shareModal');
  const qrModal = document.getElementById('qrModal');
  const closeShareModal = document.getElementById('closeShareModal');
  const closeQrModal = document.getElementById('closeQrModal');
  
  const copyProfileBtn = document.getElementById('copyProfileBtn');
  const copyInputBtn = document.getElementById('copyInputBtn');
  const shareCopyModalBtn = document.getElementById('shareCopyModalBtn');
  const shareNativeBtn = document.getElementById('shareNativeBtn');
  const shareTwitterBtn = document.getElementById('shareTwitterBtn');
  const shareWhatsAppBtn = document.getElementById('shareWhatsAppBtn');
  const shareUrlInput = document.getElementById('shareUrlInput');
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toastMsg');

  // Update share input to current URL if valid
  const currentUrl = window.location.href.startsWith('http') 
    ? window.location.href 
    : PROFILE_CONFIG.links.portfolio;
  
  if (shareUrlInput) {
    shareUrlInput.value = currentUrl;
  }

  // Toast Notification Trigger
  let toastTimer = null;
  function showToast(message = "Link copied to clipboard!") {
    if (toastMsg) toastMsg.textContent = message;
    if (toast) {
      toast.classList.add('show');
      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => {
        toast.classList.remove('show');
      }, 2800);
    }
  }

  // Copy to Clipboard Utility
  async function copyToClipboard(text) {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        // Fallback for non-https or older browsers
        const tempInput = document.createElement('input');
        tempInput.value = text;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
      }
      showToast("Link copied to clipboard!");
    } catch (err) {
      console.error('Failed to copy: ', err);
      showToast("Copied to clipboard!");
    }
  }

  // Modal Open / Close Handlers
  function openModal(modal) {
    if (modal) {
      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeModal(modal) {
    if (modal) {
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  // Open Modals
  if (shareBtn) shareBtn.addEventListener('click', () => openModal(shareModal));
  if (qrBtn) qrBtn.addEventListener('click', () => openModal(qrModal));

  // Close Modals
  if (closeShareModal) closeShareModal.addEventListener('click', () => closeModal(shareModal));
  if (closeQrModal) closeQrModal.addEventListener('click', () => closeModal(qrModal));

  // Close on Backdrop Click
  [shareModal, qrModal].forEach(modal => {
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          closeModal(modal);
        }
      });
    }
  });

  // Close on Escape Key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal(shareModal);
      closeModal(qrModal);
    }
  });

  // Copy Actions
  if (copyProfileBtn) {
    copyProfileBtn.addEventListener('click', () => {
      copyToClipboard(currentUrl);
    });
  }

  if (copyInputBtn) {
    copyInputBtn.addEventListener('click', () => {
      copyToClipboard(shareUrlInput ? shareUrlInput.value : currentUrl);
    });
  }

  if (shareCopyModalBtn) {
    shareCopyModalBtn.addEventListener('click', () => {
      copyToClipboard(currentUrl);
      closeModal(shareModal);
    });
  }

  // Native Web Share
  if (shareNativeBtn) {
    shareNativeBtn.addEventListener('click', async () => {
      if (navigator.share) {
        try {
          await navigator.share({
            title: `${PROFILE_CONFIG.name} | Links`,
            text: `Check out Mark Oliver Quiazon's links and social profiles!`,
            url: currentUrl,
          });
          closeModal(shareModal);
        } catch (err) {
          if (err.name !== 'AbortError') {
            copyToClipboard(currentUrl);
          }
        }
      } else {
        copyToClipboard(currentUrl);
      }
    });
  }

  // Twitter Share
  if (shareTwitterBtn) {
    shareTwitterBtn.addEventListener('click', () => {
      const tweetText = encodeURIComponent(`Connect with ${PROFILE_CONFIG.name} (@qznmark): `);
      const url = `https://twitter.com/intent/tweet?text=${tweetText}&url=${encodeURIComponent(currentUrl)}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    });
  }

  // WhatsApp Share
  if (shareWhatsAppBtn) {
    shareWhatsAppBtn.addEventListener('click', () => {
      const msg = encodeURIComponent(`Connect with ${PROFILE_CONFIG.name}: ${currentUrl}`);
      const url = `https://api.whatsapp.com/send?text=${msg}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    });
  }

  // Add click ripple / tactile effect to link cards
  const linkCards = document.querySelectorAll('.link-card');
  linkCards.forEach(card => {
    card.addEventListener('click', function(e) {
      // Create ripple effect
      const circle = document.createElement('span');
      const diameter = Math.max(card.clientWidth, card.clientHeight);
      const radius = diameter / 2;

      const rect = card.getBoundingClientRect();
      circle.style.width = circle.style.height = `${diameter}px`;
      circle.style.left = `${e.clientX - rect.left - radius}px`;
      circle.style.top = `${e.clientY - rect.top - radius}px`;
      circle.style.position = 'absolute';
      circle.style.borderRadius = '50%';
      circle.style.backgroundColor = 'rgba(162, 191, 254, 0.2)';
      circle.style.transform = 'scale(0)';
      circle.style.animation = 'ripple 600ms linear';
      circle.style.pointerEvents = 'none';

      const existingRipple = card.querySelector('.ripple');
      if (existingRipple) {
        existingRipple.remove();
      }

      circle.classList.add('ripple');
      card.appendChild(circle);

      setTimeout(() => {
        circle.remove();
      }, 600);
    });
  });

  // Inject keyframe for ripple dynamically
  const style = document.createElement('style');
  style.innerHTML = `
    @keyframes ripple {
      to {
        transform: scale(3.5);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
});
