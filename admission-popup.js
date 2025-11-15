class AdmissionPopup extends HTMLElement {
    connectedCallback() {
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML = `
        <style>
          .popup-container {
            position: fixed;
            inset: 0;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 50;
          }
          .popup-content {
            background-color: white;
            border-radius: 1rem;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
            max-width: 28rem;
            width: 100%;
            padding: 1.5rem;
            text-align: center;
            position: relative;
            animation: bounce 0.5s;
          }
          .close-btn {
            position: absolute;
            top: 0.75rem;
            right: 0.75rem;
            color: #6b7280;
            cursor: pointer;
            transition: color 0.2s;
          }
          .close-btn:hover {
            color: #ef4444;
          }
          .popup-title {
            font-size: 1.5rem;
            font-weight: bold;
            color: #065f46;
            margin-bottom: 1rem;
          }
          .popup-message {
            color: #4b5563;
            margin-bottom: 1.5rem;
          }
          .apply-btn {
            background-color: #059669;
            color: white;
            padding: 0.5rem 1.5rem;
            border-radius: 0.75rem;
            font-weight: 500;
            transition: background-color 0.2s;
            display: inline-block;
          }
          .apply-btn:hover {
            background-color: #047857;
          }
          @keyframes bounce {
            0%, 20%, 50%, 80%, 100% {transform: translateY(0);}
            40% {transform: translateY(-30px);}
            60% {transform: translateY(-15px);}
          }
        </style>
        <div class="popup-container">
          <div class="popup-content">
            <span class="close-btn">✖</span>
            <h2 class="popup-title">📢 Admission is Available!</h2>
            <p class="popup-message">
              You can now apply for your Admission Form online at 
              <span style="font-weight: 600; color: #059669;">Mustard Seed School, Ibokun</span>.
            </p>
            <a href="admission.html" class="apply-btn">
              Apply Now
            </a>
          </div>
        </div>
      `;
  
      this.shadowRoot.querySelector('.close-btn').addEventListener('click', () => {
        this.remove();
      });
    }
  }
  
  customElements.define('admission-popup', AdmissionPopup);