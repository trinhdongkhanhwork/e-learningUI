
import axios from 'axios';

const API_BASE_URL = process.env.VUE_APP_API_BASE_URL || 'http://localhost:8080'; // Sử dụng biến môi trường hoặc fallback

// Xuất tất cả lịch sử rút tiền admin
export const exportWithdrawHistory = async (payload) => {
    try {
        const response = await axios.post(
            `${API_BASE_URL}/api/transactions/export/all/withdraw-history`,
            {
                startDate: payload.startDate,
                endDate: payload.endDate,
            },
            {
                responseType: 'blob', // Để nhận file Excel
            }
        );

        // Tạo link tải file
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'tat-ca-lich-su-rut-tien.xlsx');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);

        return { success: true };
    } catch (error) {
        console.error('Lỗi khi xuất tất cả lịch sử rút tiền:', error);
        let errorMessage = 'Có lỗi xảy ra khi xuất file. Vui lòng thử lại.';

        // Xử lý lỗi HTTP cụ thể
        if (error.response) {
            if (error.response.data instanceof Blob) {
                const text = await error.response.data.text();
                try {
                    const json = JSON.parse(text);
                    errorMessage = json.message || errorMessage;
                } catch (e) {
                    errorMessage = `Lỗi server: ${error.response.status}`;
                }
            } else {
                errorMessage = error.response.data?.message || `Lỗi server: ${error.response.status}`;
            }
        } else if (error.request) {
            errorMessage = 'Không thể kết nối đến server. Vui lòng kiểm tra mạng.';
        }

        return { success: false, error: errorMessage };
    }
};
//Xuất tất cả lịch sử tiền vào ví admin
export const exportAllMoneyHistory = async (payload) => {
    try {
        const response = await axios.post(
            `${API_BASE_URL}/api/transactions/export/all/money-history`,
            {
                startDate: payload.startDate,
                endDate: payload.endDate,
            },
            {
                responseType: 'blob', // Để nhận file Excel
            }
        );

        // Tạo link tải file
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'tat-ca-lich-su-tien-vao.xlsx');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);

        return { success: true };
    } catch (error) {
        console.error('Lỗi khi xuất tất cả lịch sử rút tiền:', error);
        let errorMessage = 'Có lỗi xảy ra khi xuất file. Vui lòng thử lại.';

        // Xử lý lỗi HTTP cụ thể
        if (error.response) {
            if (error.response.data instanceof Blob) {
                const text = await error.response.data.text();
                try {
                    const json = JSON.parse(text);
                    errorMessage = json.message || errorMessage;
                } catch (e) {
                    errorMessage = `Lỗi server: ${error.response.status}`;
                }
            } else {
                errorMessage = error.response.data?.message || `Lỗi server: ${error.response.status}`;
            }
        } else if (error.request) {
            errorMessage = 'Không thể kết nối đến server. Vui lòng kiểm tra mạng.';
        }

        return { success: false, error: errorMessage };
    }
};

// Hàm cho user: Xuất lịch sử rút tiền của user
export const exportUserWithdrawHistory = async (payload) => {
    try {
        const response = await axios.post(
            `${API_BASE_URL}/api/transactions/export/withdrawl-history`,
            {
                userId: payload.userId,
                startDate: payload.startDate,
                endDate: payload.endDate,
            },
            {
                responseType: 'blob', // Để nhận file Excel
            }
        );

        // Tạo link tải file
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'lich-su-rut-tien.xlsx'); // Khớp với tên file của backend
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);

        return { success: true };
    } catch (error) {
        console.error('Lỗi khi xuất lịch sử rút tiền của user:', error);
        let errorMessage = 'Có lỗi xảy ra khi xuất file. Vui lòng thử lại.';

        // Xử lý lỗi HTTP cụ thể
        if (error.response) {
            if (error.response.data instanceof Blob) {
                const text = await error.response.data.text();
                try {
                    const json = JSON.parse(text);
                    errorMessage = json.message || errorMessage;
                } catch (e) {
                    errorMessage = `Lỗi server: ${error.response.status}`;
                }
            } else {
                errorMessage = error.response.data?.message || `Lỗi server: ${error.response.status}`;
            }
        } else if (error.request) {
            errorMessage = 'Không thể kết nối đến server. Vui lòng kiểm tra mạng.';
        }

        return { success: false, error: errorMessage };
    }
};
// Hàm cho user: Xuất lịch sử tiền vào của user
export const exportMoneyHistory = async (payload) => {
    try {
        const response = await axios.post(
            `${API_BASE_URL}/api/transactions/export/money-history`,
            {
                userId: payload.userId,
                startDate: payload.startDate,
                endDate: payload.endDate,
            },
            {
                responseType: 'blob', // Để nhận file Excel
            }
        );

        // Tạo link tải file
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'lich-su-tien-vao.xlsx'); // Khớp với tên file của backend
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);

        return { success: true };
    } catch (error) {
        console.error('Lỗi khi xuất lịch sử rút tiền của user:', error);
        let errorMessage = 'Có lỗi xảy ra khi xuất file. Vui lòng thử lại.';

        // Xử lý lỗi HTTP cụ thể
        if (error.response) {
            if (error.response.data instanceof Blob) {
                const text = await error.response.data.text();
                try {
                    const json = JSON.parse(text);
                    errorMessage = json.message || errorMessage;
                } catch (e) {
                    errorMessage = `Lỗi server: ${error.response.status}`;
                }
            } else {
                errorMessage = error.response.data?.message || `Lỗi server: ${error.response.status}`;
            }
        } else if (error.request) {
            errorMessage = 'Không thể kết nối đến server. Vui lòng kiểm tra mạng.';
        }

        return { success: false, error: errorMessage };
    }
};