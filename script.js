document.addEventListener('DOMContentLoaded', function() {
    // Form navigation
    const formSections = document.querySelectorAll('.form-section');
    const progressSteps = document.querySelectorAll('.progress-step');
    let currentSection = 0;
    
    // Next button click handler
    document.querySelectorAll('.next-btn').forEach(button => {
        button.addEventListener('click', function() {
            // Validate current section before proceeding
            const currentForm = formSections[currentSection];
            const inputs = currentForm.querySelectorAll('input[required], select[required], textarea[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.checkValidity()) {
                    input.reportValidity();
                    isValid = false;
                }
            });
            
            // Special validation for subjects (max 9)
            if (currentSection === 2) { // Academic section
                const subjectCheckboxes = document.querySelectorAll('input[name="subjects"]:checked');
                if (subjectCheckboxes.length > 9) {
                    alert('Please select no more than 9 subjects.');
                    isValid = false;
                }
            }
            
            if (isValid) {
                // Mark current step as completed
                progressSteps[currentSection].classList.remove('active');
                progressSteps[currentSection].classList.add('completed');
                
                // Hide current section
                formSections[currentSection].classList.remove('active');
                
                // Show next section
                currentSection++;
                formSections[currentSection].classList.add('active');
                
                // Mark next step as active
                progressSteps[currentSection].classList.add('active');
            }
        });
    });
    
    // Previous button click handler
    document.querySelectorAll('.prev-btn').forEach(button => {
        button.addEventListener('click', function() {
            // Mark current step as inactive
            progressSteps[currentSection].classList.remove('active');
            
            // Hide current section
            formSections[currentSection].classList.remove('active');
            
            // Show previous section
            currentSection--;
            formSections[currentSection].classList.add('active');
            
            // Mark previous step as active
            progressSteps[currentSection].classList.add('active');
            progressSteps[currentSection].classList.remove('completed');
        });
    });
    
    // Form submission
    document.getElementById('admissionForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate all required fields in the last section
        const inputs = formSections[currentSection].querySelectorAll('input[required], select[required], textarea[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.checkValidity()) {
                input.reportValidity();
                isValid = false;
            }
        });
        
        if (isValid) {
            // Mark last step as completed
            progressSteps[currentSection].classList.remove('active');
            progressSteps[currentSection].classList.add('completed');
            
            // Show success modal
            document.getElementById('successModal').classList.remove('hidden');
            
            // Here you would normally send the form data to the server
            // For demo purposes, we'll just show the success modal
        }
    });
    
    // Date of birth validation (must be at least 10 years old)
    const dobInput = document.getElementById('dob');
    dobInput.addEventListener('change', function() {
        const dob = new Date(this.value);
        const today = new Date();
        const age = today.getFullYear() - dob.getFullYear();
        const monthDiff = today.getMonth() - dob.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
            age--;
        }
        
        if (age < 10) {
            this.setCustomValidity('Student must be at least 10 years old.');
        } else {
            this.setCustomValidity('');
        }
    });
    
    // Subject selection limit
    const subjectCheckboxes = document.querySelectorAll('input[name="subjects"]');
    subjectCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const checkedCount = document.querySelectorAll('input[name="subjects"]:checked').length;
            if (checkedCount > 9) {
                this.checked = false;
                alert('You can select a maximum of 9 subjects.');
            }
        });
    });
});

// Close modal function
function closeModal() {
    document.getElementById('successModal').classList.add('hidden');
    // Optional: Reset form after successful submission
    // document.getElementById('admissionForm').reset();
    // location.reload();
}