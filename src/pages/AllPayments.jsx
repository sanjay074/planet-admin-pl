import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { GetAllPayment } from "../services/Allapi";

export const AllPayment = () => {
    const [paymentList, setPaymentList] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 7;

    useEffect(() => {
        const getData = async () => {
            try {
                const result = await GetAllPayment();
                const data = Array.isArray(result.data.vendorPayOuts) ? result.data.vendorPayOuts : [];
                console.log("Fetched payments:", data);
                setPaymentList(data);
            } catch (error) {
                console.error("Error fetching payment data", error);
            }
        };
        getData();
    }, []);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value.toLowerCase());
    };

    const filteredPayments = paymentList.filter((payment) => {
        const firstName = payment.userId?.firstName?.toLowerCase() || "";
        const beneficiaryName = payment.beneficiaryName?.toLowerCase() || "";
        const accountNum = payment.accountNum?.toLowerCase() || "";
        const accountIFSC = payment.accountIFSC?.toLowerCase() || "";
        const bankName = payment.bankName?.toLowerCase() || "";
        const payoutsRef = payment.payoutsRef?.toLowerCase() || "";
        const narration = payment.narration?.toLowerCase() || "";
        const amount = String(payment.amount)?.toLowerCase() || "";

        return (
            firstName.includes(searchQuery) ||
            beneficiaryName.includes(searchQuery) ||
            accountNum.includes(searchQuery) ||
            accountIFSC.includes(searchQuery) ||
            bankName.includes(searchQuery) ||
            payoutsRef.includes(searchQuery) ||
            narration.includes(searchQuery) ||
            amount.includes(searchQuery)
        );
    });

    const firstPage = (currentPage - 1) * itemsPerPage;
    const lastPage = firstPage + itemsPerPage;
    const currentItems = filteredPayments.slice(firstPage, lastPage);
    const totalPages = Math.ceil(filteredPayments.length / itemsPerPage);

    return (
        <div className="container mx-auto p-4 mt-16">
            <div className="mb-4 flex justify-between items-center">
                <input
                    type="text"
                    placeholder="Search by any field"
                    className="w-full md:w-1/3 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
            </div>

            <div className="overflow-x-auto">
                <table className="w-full table-auto bg-white shadow-md rounded-lg border-2 border-gray">
                    <thead className="bg-gray-100">
                        <tr className="text-left text-gray-600 border">
                            <th className="px-4 py-2">Name</th>
                            <th className="px-4 py-2">Beneficiary Name</th>
                            <th className="px-4 py-2">Account Number</th>
                            <th className="px-4 py-2">Account IFSC</th>
                            <th className="px-4 py-2">Bank Name</th>
                            <th className="px-4 py-2">Payout Ref</th>
                            <th className="px-4 py-2">Narration</th>
                            <th className="px-4 py-2">Amount</th>
                            <th className="px-4 py-2">Remarks</th>
                            <th className="px-4 py-2">Created At</th>
                        </tr>
                    </thead>
                    <tbody className="border">
                        {filteredPayments.length === 0 ? (
                            <tr>
                                <td colSpan="10" className="text-center py-4">
                                    No payments available
                                </td>
                            </tr>
                        ) : (
                            currentItems.map((payment) => (
                                <tr key={payment._id} className="border-b">
                                    <td className="px-4 py-2">{payment?.userId?.firstName || "N/A"}</td>
                                    <td className="px-4 py-2">{payment?.beneficiaryName || "N/A"}</td>
                                    <td className="px-4 py-2">{payment?.accountNum || "N/A"}</td>
                                    <td className="px-4 py-2">{payment?.accountIFSC || "N/A"}</td>
                                    <td className="px-4 py-2">{payment?.bankName || "N/A"}</td>
                                    <td className="px-4 py-2">{payment?.payoutsRef || "N/A"}</td>
                                    <td className="px-4 py-2">{payment?.narration || "N/A"}</td>
                                    <td className="px-4 py-2">{payment?.amount || "N/A"}</td>
                                    <td className="px-4 py-2">{payment?.remarks || "N/A"}</td>
                                    <td className="px-4 py-2">{new Date(payment?.createdAt).toLocaleDateString()}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-center mt-4">
                <div className="flex space-x-2">
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => setCurrentPage(index + 1)}
                            className={`px-3 py-1 border rounded ${currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-200"
                                }`}
                        >
                            {index + 1}
                        </button>
                    ))}
                    {currentPage < totalPages && (
                        <button
                            onClick={() => setCurrentPage(currentPage + 1)}
                            className="px-3 py-1 bg-blue-500 text-white rounded"
                        >
                            Next
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};
