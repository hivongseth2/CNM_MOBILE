// export default function formatTimeDifference(timestamp) {
//   const now = new Date();
//   const messageTime = new Date(timestamp);
//   const diffTime = now - messageTime;

//   // Chuyển đổi milliseconds thành phút, giờ, ngày, tuần
//   const minutes = Math.floor(diffTime / 60000); // 1 phút = 60000 milliseconds
//   const hours = Math.floor(minutes / 60);
//   const days = Math.floor(hours / 24);
//   const weeks = Math.floor(days / 7);

//   // Xử lý các trường hợp khác nhau
//   if (minutes < 60) {
//     return `${minutes} phút`;
//   } else if (hours < 24) {
//     return `${hours} giờ`;
//   } else if (days < 7) {
//     return `Thứ ${messageTime.getDay()}`;
//   } else {
//     return `${messageTime.getDate()}/${messageTime.getMonth() + 1}/${messageTime.getFullYear()}`;
//   }
// }

export default function formatTimeDifference(timestampString) {
  // Tách ngày, tháng, năm, giờ, phút, giây từ chuỗi đầu vào
  const [datePart, timePart] = timestampString.split(' ');
  const [day, month, year] = datePart.split('-').map(Number);
  const [hour, minute, second] = timePart.split(':').map(Number);

  // Tạo đối tượng Date từ thông tin được tách ra
  const messageTime = new Date(year, month - 1, day, hour, minute, second);
  const now = new Date();
  const diffTime = now - messageTime;

  // Chuyển đổi milliseconds thành phút, giờ, ngày, tuần
  const minutes = Math.floor(diffTime / 60000); // 1 phút = 60000 milliseconds
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);

  // Xử lý các trường hợp khác nhau
  if (minutes < 60) {
    return `${minutes} phút`;
  } else if (hours < 24) {
    return `${hours} giờ`;
  } else if (days < 7) {
    return `Thứ ${messageTime.getDay()}`;
  } else {
    return `${messageTime.getDate()}/${messageTime.getMonth() + 1}/${messageTime.getFullYear()}`;
  }
}
