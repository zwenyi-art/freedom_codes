import React from "react";

const Testing = () => {
  const isp_list = {};

  return (
    <div className="py-1" role="none">
      <ul className="w-48 text-sm font-medium text-gray-900 border border-gray-200 rounded-lg ">
        <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
          <div className="flex items-center ps-3">
            <input
              id="list-radio-license"
              type="radio"
              defaultValue=""
              name="list-radio"
              className="w-4 h-4 text-blue-600 focus:ring-opacity-100 bg-gray-800 border-green-700  dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-0  dark:bg-gray-600 dark:border-yellow-500"
            />
            <label
              htmlFor="list-radio-license"
              className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Driver License
            </label>
          </div>
        </li>
        <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
          <div className="flex items-center ps-3">
            <input
              id="list-radio-id"
              type="radio"
              defaultValue=""
              name="list-radio"
              className="w-4 h-4 text-blue-600 focus:ring-opacity-100 bg-gray-800 border-green-700  dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-0  dark:bg-gray-600 dark:border-yellow-500"
            />
            <label
              htmlFor="list-radio-id"
              className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              State ID
            </label>
          </div>
        </li>
        <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
          <div className="flex items-center ps-3">
            <input
              id="list-radio-military"
              type="radio"
              defaultValue=""
              name="list-radio"
              className="w-4 h-4 text-blue-600 focus:ring-opacity-100 bg-gray-800 border-green-700  dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-0  dark:bg-gray-600 dark:border-yellow-500"
            />
            <label
              htmlFor="list-radio-military"
              className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              US Military
            </label>
          </div>
        </li>
        <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
          <div className="flex items-center ps-3">
            <input
              id="list-radio-passport"
              type="radio"
              defaultValue=""
              name="list-radio"
              className="w-4 h-4 text-blue-600 focus:ring-opacity-100 bg-gray-800 border-green-700  dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-0  dark:bg-gray-600 dark:border-yellow-500"
            />
            <label
              htmlFor="list-radio-passport"
              className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              US Passport
            </label>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Testing;
