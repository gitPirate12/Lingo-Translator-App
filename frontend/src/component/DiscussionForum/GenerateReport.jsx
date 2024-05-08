import React, { useState } from 'react';
import axios from 'axios';
import exceljs from 'exceljs'; // Import exceljs library

function GenerateReport() {
  const [loading, setLoading] = useState(false);

  const generateExcelReport = async () => {
    setLoading(true);
    try {
      // Fetch posts data from the server
      const response = await axios.get('http://localhost:3040/api/posts/');
      const posts = response.data;

      // Create a new Excel workbook
      const workbook = new exceljs.Workbook();
      const worksheet = workbook.addWorksheet('Posts');

      // Add headers to the worksheet
      worksheet.addRow(['ID', 'Question', 'Description', 'Author', 'Tags', 'Vote Count']);

      // Add post data to the worksheet
      posts.forEach(post => {
        worksheet.addRow([post._id, post.question, post.description, post.author, post.tags.join(', '), post.voteCount]);
      });

      // Save the workbook as an Excel file
      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'posts.xlsx';
      a.click();
      setLoading(false);
    } catch (error) {
      console.error('Error generating Excel report:', error);
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={generateExcelReport} disabled={loading}>
        {loading ? 'Generating...' : 'Generate Excel Report'}
      </button>
    </div>
  );
}

export default GenerateReport;
