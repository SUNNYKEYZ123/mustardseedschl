// 1. Helper for 1st, 2nd, 3rd...
function getOrdinal(n) {
    const s = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

// 2. Data persistence
let students = JSON.parse(localStorage.getItem('mustardSeedData')) || [];

const studentForm = document.getElementById('studentForm');
const tableBody = document.getElementById('studentTableBody');

// 3. Form Submission
studentForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('studentName').value;
    const aggregate = parseFloat(document.getElementById('aggregateScore').value);
    const subjects = parseInt(document.getElementById('totalSubjects').value);

    const average = (aggregate / subjects).toFixed(2);

    const newEntry = {
        id: Date.now().toString(),
        name,
        aggregate,
        average: parseFloat(average)
    };

    students.push(newEntry);
    saveAndRender();
    studentForm.reset();
});

// 4. Main Rendering Function
function saveAndRender() {
    localStorage.setItem('mustardSeedData', JSON.stringify(students));

    // Sort: Highest Average first
    students.sort((a, b) => b.average - a.average);

    tableBody.innerHTML = '';
    let currentRank = 1;

    students.forEach((student, index) => {
        // TIE LOGIC
        if (index > 0 && student.average < students[index - 1].average) {
            currentRank = index + 1;
        }

        let rankClass = "rank-other";
        if (currentRank === 1) rankClass = "rank-badge rank-1st";
        else if (currentRank === 2) rankClass = "rank-badge rank-2nd";
        else if (currentRank === 3) rankClass = "rank-badge rank-3rd";

        const row = document.createElement('tr');
        row.className = "hover:bg-gray-50 transition-colors";
        row.innerHTML = `
            <td class="px-6 py-4 whitespace-nowrap"><span class="${rankClass}">${getOrdinal(currentRank)}</span></td>
            <td class="px-6 py-4 font-bold text-gray-800">${student.name}</td>
            <td class="px-6 py-4 text-gray-600 font-medium">${student.aggregate}</td>
            <td class="px-6 py-4 font-semibold text-indigo-600">${student.average}%</td>
            <td class="px-6 py-4 text-right no-print">
                <button onclick="deleteStudent('${student.id}')" class="text-gray-400 hover:text-red-600 transition-colors">
                    <i data-feather="trash-2" style="width:18px"></i>
                </button>
            </td>
        `;
        tableBody.appendChild(row);
    });

    if (window.feather) feather.replace();
}

// 5. Delete Logic
window.deleteStudent = (id) => {
    if(confirm("Delete this student result?")) {
        students = students.filter(s => s.id !== id);
        saveAndRender();
    }
};

// Start the app
saveAndRender();
window.exportToExcel = () => {
    if (students.length === 0) {
        alert("No data to export!");
        return;
    }

    // 1. Create the Header Row
    let csvContent = "Rank,Student Name,Total Score,Average (%)\n";

    // 2. Add each student's data
    // We sort them first so the Excel file matches your table
    const sortedStudents = [...students].sort((a, b) => b.average - a.average);
    
    let currentRank = 1;
    sortedStudents.forEach((s, index) => {
        if (index > 0 && s.average < sortedStudents[index - 1].average) {
            currentRank = index + 1;
        }
        
        // Add a line to the CSV
        csvContent += `${currentRank},${s.name},${s.aggregate},${s.average}%\n`;
    });

    // 3. Create the download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "Mustard_Seed_Results.csv");
    document.body.appendChild(link);

    // 4. Trigger the download
    link.click();
    document.body.removeChild(link);
};
window.resetSystem = () => {
    // First confirmation
    const firstConfirm = confirm("Are you sure you want to delete ALL student records?");
    
    if (firstConfirm) {
        // Second confirmation (for safety!)
        const secondConfirm = confirm("This cannot be undone. Are you absolutely sure?");
        
        if (secondConfirm) {
            // Wipe the local storage
            localStorage.removeItem('mustardSeedData');
            // Empty the students array
            students = [];
            // Refresh the table
            saveAndRender();
            alert("System has been reset. All records cleared.");
        }
    }
};