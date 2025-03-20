import React from 'react';

export const IssueMessage: React.FC<{ message: string }> = ({ message }) => {
  return (
    <tr>
      <td className="py-4">{message}</td>
    </tr>
  );
};
