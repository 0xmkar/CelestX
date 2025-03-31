// import { Wallet } from "lucide-react";
// import { JSX, useEffect, useState } from "react";

// interface WalletData {
//   balance: string;
//   usdValue: string;
// }

// interface BalanceResponse {
//   status: 'success' | 'Failure';
//   details: {
//     address?: string;
//     balance?: any;
//   };
// }

// // Helper function to safely access Chrome storage or use a fallback
// const getFromStorage = async (key: string): Promise<string | null> => {
//   if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
//     return new Promise((resolve) => {
//       chrome.storage.local.get([key], (result) => {
//         resolve(result[key] || null);
//       });
//     });
//   } else {
//     console.log("Chrome extension API not available, using fallback storage");
//     const mockValue = localStorage.getItem(key);
//     return mockValue || "no_private_key";
//   }
// };

// const formatBalance = (balance: any): string => {
//   if (balance === undefined || balance === null) {
//     return "N/A";
//   }
  
//   if (typeof balance === 'object') {
//     if (balance.toString && balance.toString() !== '[object Object]') {
//       return balance.toString();
//     }
    
//     if (balance.value !== undefined) return balance.value.toString();
//     if (balance.amount !== undefined) return balance.amount.toString();
    
//     try {
//       return JSON.stringify(balance);
//     } catch (e) {
//       return "Invalid balance format";
//     }
//   }
  
//   return balance.toString();
// };

// export default function WalletInfo(): JSX.Element {
//   const [walletData, setWalletData] = useState<WalletData>({
//     balance: "Loading...",
//     usdValue: "Loading..."
//   });
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchWalletBalance = async (): Promise<void> => {
//       try {
//         const privateKey = "0xe897c166f990af5372d15cf6ff76cfafd7ee2264adb5edb2d569f221bf78e093";

//         if (!privateKey) {
//           setError("No private key found");
//           setWalletData({
//             balance: "N/A",
//             usdValue: "$ 0.0"
//           });
//           return;
//         }

//         // Call the getBalance endpoint
//         const response = await fetch("http://localhost:5000/getBalance", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json"
//           },
//           body: JSON.stringify({
//             privateKey: privateKey
//           })
//         });

//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }

//         const result: BalanceResponse = await response.json();
//         console.log("API Response:", result); // Add this to debug the response
        
//         if (result.status === "success" && result.details.balance !== undefined) {
//           const formattedBalance = formatBalance(result.details.balance);
//           setWalletData({
//             balance: formattedBalance + " S",
//             usdValue: "$ 0.0" // You can calculate this if you have exchange rate data
//           });
//         } else {
//           setError("Failed to get balance");
//           setWalletData({
//             balance: "Error",
//             usdValue: "$ 0.0"
//           });
//         }
//       } catch (error) {
//         console.error("Error fetching wallet balance:", error);
//         setError("958.005");
//         setWalletData({
//           balance: "Error",
//           usdValue: "$ 0.0"
//         });
//       }
//     };

//     fetchWalletBalance();
//   }, []);

//   return (
//     <div className="bg-white p-6 rounded-lg shadow">
//       <div className="space-y-2 flex gap-[100px] b">
//         <h2 className="text-xl font-semibold mb-4 flex items-center">
//           <Wallet className="w-5 h-5 mr-2 flex" />
//           Wallet Info
//           {error && <span className="text-xs text-red-500 ml-2">({error})</span>}
//         </h2>
//         <div>
//           <p className="text-sm text-gray-600">Balance:</p>
//           <hr />
//           <p className="text-lg font-semibold">{walletData.balance}</p>
//         </div>
//         <div>
//           <p className="text-sm text-gray-600">USD Value:</p>
//           <hr />
//           <p className="text-lg font-semibold">0.0 $</p>
//         </div>
//       </div>
//     </div>
//   );
// }


import { Wallet, DollarSign, AlertCircle, RefreshCw } from "lucide-react";
import { JSX, useEffect, useState } from "react";

interface WalletData {
  balance: string;
  usdValue: string;
}

interface BalanceResponse {
  status: 'success' | 'Failure';
  details: {
    address?: string;
    balance?: any;
  };
}

// Helper function to safely access Chrome storage or use a fallback
const getFromStorage = async (key: string): Promise<string | null> => {
  if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
    return new Promise((resolve) => {
      chrome.storage.local.get([key], (result) => {
        resolve(result[key] || null);
      });
    });
  } else {
    console.log("Chrome extension API not available, using fallback storage");
    const mockValue = localStorage.getItem(key);
    return mockValue || "no_private_key";
  }
};

const formatBalance = (balance: any): string => {
  if (balance === undefined || balance === null) {
    return "N/A";
  }
  
  if (typeof balance === 'object') {
    if (balance.toString && balance.toString() !== '[object Object]') {
      return balance.toString();
    }
    
    if (balance.value !== undefined) return balance.value.toString();
    if (balance.amount !== undefined) return balance.amount.toString();
    
    try {
      return JSON.stringify(balance);
    } catch (e) {
      return "Invalid balance format";
    }
  }
  
  return balance.toString();
};

export default function WalletInfo(): JSX.Element {
  const [walletData, setWalletData] = useState<WalletData>({
    balance: "Loading...",
    usdValue: "Loading..."
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Simulate loading
    const timeout = setTimeout(() => {
      setWalletData({
        balance: "958.005 XLM",
        usdValue: "$ 256.6533"
      });
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timeout);
  }, []);

  const handleRefresh = () => {
    setIsLoading(true);
    setWalletData({
      balance: "Loading...",
      usdValue: "Loading..."
    });
    
    // Simulate refresh with a timeout
    setTimeout(() => {
      setWalletData({
        balance: "958.005 XLM",
        usdValue: "$ 256.6533"
      });
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg shadow-md border border-indigo-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold flex items-center text-indigo-800">
          <Wallet className="w-5 h-5 mr-2 text-indigo-600" />
          Wallet Overview
        </h2>
        <button 
          onClick={handleRefresh} 
          className="p-2 rounded-full hover:bg-indigo-100 text-indigo-600 transition-colors"
          title="Refresh balance"
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 flex items-center">
          <AlertCircle className="w-5 h-5 mr-2" />
          <span className="text-sm">Error fetching balance: {error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600 font-medium">Balance</p>
            <div className="h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center">
              <Wallet className="w-3 h-3 text-indigo-600" />
            </div>
          </div>
          <div className="flex items-baseline">
            <p className="text-2xl font-bold text-gray-900">
              {isLoading ? (
                <span className="inline-block w-16 h-8 bg-gray-200 animate-pulse rounded"></span>
              ) : (
                walletData.balance
              )}
            </p>
          </div>
          <p className="text-xs text-gray-500 mt-1">Stellar Lumens</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600 font-medium">USD Value</p>
            <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center">
              <DollarSign className="w-3 h-3 text-green-600" />
            </div>
          </div>
          <div className="flex items-baseline">
            <p className="text-2xl font-bold text-gray-900">
              {isLoading ? (
                <span className="inline-block w-16 h-8 bg-gray-200 animate-pulse rounded"></span>
              ) : (
                walletData.usdValue
              )}
            </p>
          </div>
          <p className="text-xs text-gray-500 mt-1">Current market value</p>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500">Last updated: {new Date().toLocaleTimeString()}</span>
          <a href="#" className="text-xs text-indigo-600 hover:text-indigo-800 transition-colors">View transaction history</a>
        </div>
      </div>
    </div>
  );
}