/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { FiCopy, FiCheck, FiSend } from "react-icons/fi";
import { useGetAllNewsletterQuery } from "../../../redux/Features/Admin/adminApi";
import Loader from "../../../component/Reusable/Loader/Loader";

const Emails = () => {
  const { data: newsletters, isLoading } = useGetAllNewsletterQuery({});
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  const copyToClipboard = (email: string) => {
    navigator.clipboard
      .writeText(email)
      .then(() => {
        setCopiedEmail(email);
        setTimeout(() => {
          setCopiedEmail(null);
        }, 3000);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800">Email List</h1>
          <p className="text-gray-600 mt-2">
            Click the copy button to quickly copy individual email addresses
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gradient-to-r from-primary-10 to-primary-15/80 text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium uppercase tracking-wider rounded-tl-xl">
                    ID
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium uppercase tracking-wider">
                    Email Address
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium uppercase tracking-wider rounded-tr-xl">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {isLoading ? (
                  <tr>
                    <td
                      colSpan={3}
                      className="px-6 py-10 text-center text-gray-500"
                    >
                      <Loader />
                    </td>
                  </tr>
                ) : newsletters?.data?.length === 0 ? (
                  <tr>
                    <td
                      colSpan={3}
                      className="px-6 py-10 text-center text-gray-500"
                    >
                      No Newsletter Found
                    </td>
                  </tr>
                ) : (
                  newsletters?.data?.map((item: any) => (
                    <tr
                      key={item?._id}
                      className="hover:bg-blue-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {item?._id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {item.email}
                      </td>
                      <td className=" py-4 whitespace-nowrap text-sm flex items-center">
                        {/* Copy Button */}
                        <button
                          onClick={() => copyToClipboard(item?.email)}
                          className="flex items-center justify-center p-2 rounded-lg transition-all cursor-pointer"
                          title="Copy email"
                        >
                          {copiedEmail === item?.email ? (
                            <div className="flex items-center text-green-600 bg-green-100 px-3 py-2 rounded-lg">
                              <FiCheck className="w-4 h-4 mr-1" />
                              <span className="text-xs">Copied!</span>
                            </div>
                          ) : (
                            <div className="flex items-center text-gray-600 hover:text-blue-600 hover:bg-blue-100 px-3 py-2 rounded-lg">
                              <FiCopy className="w-4 h-4 mr-1" />
                              <span className="text-xs">Copy</span>
                            </div>
                          )}
                        </button>

                        {/* Send Email Button */}
                        <button
                          onClick={() =>
                            window.open(
                              `https://mail.google.com/mail/?view=cm&fs=1&to=${item?.email}`,
                              "_blank"
                            )
                          }
                          className="flex items-center text-gray-600 hover:text-blue-600 hover:bg-blue-100 px-3 py-2 rounded-lg cursor-pointer"
                          title="Send Email"
                        >
                          <FiSend className="text-primary-20 text-lg" />{" "}
                          <span className="ml-1 text-xs">Send</span>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Emails;
