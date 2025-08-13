import React from "react";

// Idea: giống như time travel
// - Cần biến lưu "checkpoint" => const [history, setHistory]
// - Làm sao history biết được cái gì cần lưu ? => lưu mỗi step, vậy tổ hợp các step sẽ nằm trong history
// - Vậy step sẽ là gì ? => state của squares
// - Khi click vào step, cần quay lại state tương ứng
// - Mục đích cuối cùng: người chơi có thể xem lại các bước trước và quay lại bất kỳ bước nào
function History({ history, moveTo }) {
  return (
    <div className="history">
      <h4>History</h4>
      <ul>
        {history.map((squares, step) => (
          <li key={step}>
            <button onClick={() => moveTo(step)}>
              {step === 0 ? "Go to start" : `Go to step #${step}`}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default History;
