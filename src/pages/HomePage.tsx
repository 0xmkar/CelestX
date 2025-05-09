// import WalletInfo from "../components/WalletInfo";

// import TransactionsTable from "../components/TransactionsTable";
// import { Wallet } from "lucide-react";
// import { useAuth0 } from "@auth0/auth0-react";
// import { useEffect, useState } from "react";
// import { Button } from "../components/ui/button";
// import LogoutButton from "../components/logoutButton";
// import LoginButton from "../components/loginButton";
// import BaseWallet from "../lib/wallet";


// export default function Home() {
//   const { user, isAuthenticated, isLoading } = useAuth0();
//   const [twitterUsername, setTwitterUsername] = useState<string | null>(null);
//   const [walletAddress, setWalletAddress] = useState("0x1234...5678");
//   const [publicKey, setPublicKey] = useState<string>("");
//   const [privateKey, setPrivateKey] = useState<string>("");

//   const fetchTwitterUsername = async () => {
//     if (user?.sub?.startsWith("twitter|")) {
//       const twitterId = user.sub.split("|")[1];

//       try {
//         const response = await fetch(
//           `http://localhost:5000/api/twitter-username?twitterId=${twitterId}`
//         );
//         const data = await response.json();
//         setTwitterUsername(data.username);
//         console.log(data);
//       } catch (error) {
//         console.error("Error fetching Twitter username:", error);
//       }
//     }
//   };

//   const storeUserData = async () => {
//     if (!twitterUsername || !user?.sub) return;
  
//     const twitterId = user.sub.split("|")[1];
  
//     try {
//       // Check if user exists
//       const checkResponse = await fetch(
//         `http://localhost:5000/api/check-user?twitterId=${twitterId}`
//       );
//       const checkData = await checkResponse.json();
  
//       if (checkData.exists) {
//         console.log("User already exists in the database.");
  
//         // Fetch the user's wallet data
//         const userResponse = await fetch(
//           `http://localhost:5000/api/get-user?twitterId=${twitterId}`
//         );
//         const userData = await userResponse.json();
  
//         if (userData.publicKey && userData.privateKey) {
//           setPublicKey(userData.publicKey);
//           setWalletAddress(userData.publicKey);
//           setPrivateKey(userData.privateKey);
//           const pub = userData.publicKey;
//           const pvt = userData.privateKey;
//           console.log(JSON.stringify({ pub, pvt }), "asdasddsadasdsaddassdaasd");
          
//           localStorage.setItem("pub", pub);
//           localStorage.setItem("pvt", pvt);
//           window.postMessage({
//             type: "FROM_PAGE",
//             pub: pub,
//             pvt: pvt,
//           }, "*");
//           console.log("Wallet data retrieved and stored.");
//         }
//         return;
//       }
  
//       // If user doesn't exist, create a new wallet
//       const newWallet = new BaseWallet("https://base-sepolia.drpc.org");
//       const wallet = await newWallet.createWallet();
  
//       const publicKey = wallet.address;
//       const privateKey = wallet.privateKey;
//       setPublicKey(publicKey);
//       setWalletAddress(publicKey);
//       setPrivateKey(privateKey);
  
//       localStorage.setItem("pub", publicKey);
//       localStorage.setItem("pvt", privateKey);
//       window.postMessage({
//         type: "FROM_PAGE",
//         pub: publicKey,
//         pvt: privateKey,
//       }, "*");
//       const newUser = {
//         username: twitterUsername,
//         twitterId,
//         publicKey,
//         privateKey,
//       };
  
//       // Save the new user to the database
//       const saveResponse = await fetch("http://localhost:5000/api/save-user", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(newUser),
//       });
  
//       const data = await saveResponse.json();
//       console.log("User stored:", data);
//     } catch (error) {
//       console.error("Error storing user:", error);
//     }
//   };
  
//   useEffect(() => {
//     if (user) {
//       fetchTwitterUsername();
//     }
//   }, [user]);

//   useEffect(() => {
//     if (user && twitterUsername) {
//       storeUserData();
//     }
//   }, [user, twitterUsername]);

//   if (isLoading) {
//     return <div>Loading ...</div>;
//   }

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <nav className="bg-white shadow">
//         <div className="container mx-auto px-4">
//           <div className="flex justify-between items-center py-4">
//             <div className="text-xl font-bold text-gray-800">Zero-X</div>
//             <div className="flex items-center space-x-4">
//               {isAuthenticated ? (
//                 <>
//                   <div className="relative group flex items-center space-x-2">
//                     <img
//                       src={user?.picture}
//                       alt={user?.name}
//                       className="w-10 h-10 rounded-full border border-gray-300"
//                     />
//                     <span className="text-gray-800 font-medium cursor-pointer">
//                       {user?.name}
//                     </span>
//                     {twitterUsername && (
//                       <div className="absolute left-0 top-10 bg-gray-800 text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
//                         @{twitterUsername}
//                       </div>
//                     )}
//                   </div>
//                   <span className="text-sm text-gray-600 flex items-center">
//                     <div className="px-2">{walletAddress}</div>
//                     <Wallet className="w-4 h-4 mr-1" />
//                   </span>
//                   <Button>
//                     <LogoutButton />
//                   </Button>
//                 </>
//               ) : (
//                 <Button>
//                   <LoginButton />
//                 </Button>
//               )}
//             </div>
//           </div>
//         </div>
//       </nav>
//       <main className="container mx-auto px-4 py-8">
//         <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
//           {isAuthenticated ? (
//             <>
//               <div className="md:col-span-3 space-y-6">
//                 <WalletInfo />

//               </div>
//               <div className="md:col-span-2">
//                 <TransactionsTable />

//               </div>
//             </>
//           ) : (
//             <div>Please login First</div>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// }







import WalletInfo from "../components/WalletInfo";
import TransactionsTable from "../components/TransactionsTable";
import { Wallet, Home as HomeIcon, User, Copy, ExternalLink, Loader2 } from "lucide-react";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import LogoutButton from "../components/logoutButton";
import LoginButton from "../components/loginButton";
import BaseWallet from "../lib/wallet";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../components/ui/tooltip";

export default function Home() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [twitterUsername, setTwitterUsername] = useState<string | null>(null);
  const [walletAddress, setWalletAddress] = useState("0x1234...5678");
  const [publicKey, setPublicKey] = useState<string>("");
  const [privateKey, setPrivateKey] = useState<string>("");
  const [copiedAddress, setCopiedAddress] = useState(false);

  const fetchTwitterUsername = async () => {
    if (user?.sub?.startsWith("twitter|")) {
      const twitterId = user.sub.split("|")[1];

      try {
        const response = await fetch(
          `http://localhost:5000/api/twitter-username?twitterId=${twitterId}`
        );
        const data = await response.json();
        setTwitterUsername(data.username);
        console.log(data);
      } catch (error) {
        console.error("Error fetching Twitter username:", error);
      }
    }
  };

  const storeUserData = async () => {
    if (!twitterUsername || !user?.sub) return;
  
    const twitterId = user.sub.split("|")[1];
  
    try {
      // Check if user exists
      const checkResponse = await fetch(
        `http://localhost:5000/api/check-user?twitterId=${twitterId}`
      );
      const checkData = await checkResponse.json();
  
      if (checkData.exists) {
        console.log("User already exists in the database.");
  
        // Fetch the user's wallet data
        const userResponse = await fetch(
          `http://localhost:5000/api/get-user?twitterId=${twitterId}`
        );
        const userData = await userResponse.json();
  
        if (userData.publicKey && userData.privateKey) {
          setPublicKey(userData.publicKey);
          setWalletAddress(userData.publicKey);
          setPrivateKey(userData.privateKey);
          const pub = userData.publicKey;
          const pvt = userData.privateKey;
          console.log(JSON.stringify({ pub, pvt }), "asdasddsadasdsaddassdaasd");
          
          localStorage.setItem("pub", pub);
          localStorage.setItem("pvt", pvt);
          window.postMessage({
            type: "FROM_PAGE",
            pub: pub,
            pvt: pvt,
          }, "*");
          console.log("Wallet data retrieved and stored.");
        }
        return;
      }
  
      // If user doesn't exist, create a new wallet
      const newWallet = new BaseWallet("https://base-sepolia.drpc.org");
      const wallet = await newWallet.createWallet();
  
      const publicKey = wallet.address;
      const privateKey = wallet.privateKey;
      setPublicKey(publicKey);
      setWalletAddress(publicKey);
      setPrivateKey(privateKey);
  
      localStorage.setItem("pub", publicKey);
      localStorage.setItem("pvt", privateKey);
      window.postMessage({
        type: "FROM_PAGE",
        pub: publicKey,
        pvt: privateKey,
      }, "*");
      const newUser = {
        username: twitterUsername,
        twitterId,
        publicKey,
        privateKey,
      };
  
      // Save the new user to the database
      const saveResponse = await fetch("http://localhost:5000/api/save-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });
  
      const data = await saveResponse.json();
      console.log("User stored:", data);
    } catch (error) {
      console.error("Error storing user:", error);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  };
  
  useEffect(() => {
    if (user) {
      fetchTwitterUsername();
    }
  }, [user]);

  useEffect(() => {
    if (user && twitterUsername) {
      storeUserData();
    }
  }, [user, twitterUsername]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-100">
        <div className="text-center">
          <Loader2 className="h-10 w-10 animate-spin text-indigo-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900">Loading your account...</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-100">
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <HomeIcon className="h-6 w-6 text-indigo-600" />
              <div className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">Zero-X</div>
            </div>
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex items-center space-x-2 bg-gray-100 rounded-full py-1 px-3 hover:bg-gray-200 transition-colors">
                          <img
                            src={user?.picture}
                            alt={user?.name}
                            className="w-8 h-8 rounded-full border-2 border-indigo-200"
                          />
                          <span className="text-gray-800 font-medium">
                            {user?.name}
                          </span>
                          {twitterUsername && (
                            <span className="text-indigo-500 text-sm">@{twitterUsername}</span>
                          )}
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Your Profile</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <div className="flex items-center bg-gray-100 rounded-full py-1 px-3">
                    <Wallet className="w-4 h-4 mr-2 text-indigo-600" />
                    <span className="text-sm font-mono text-gray-600 mr-2">
                      {walletAddress.substring(0, 6)}...{walletAddress.substring(walletAddress.length - 4)}
                    </span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button 
                            onClick={copyToClipboard}
                            className="text-gray-500 hover:text-indigo-600 transition-colors"
                          >
                            {copiedAddress ? (
                              <span className="text-xs text-green-500">Copied!</span>
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Copy address</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  
                  <Button variant="default" className="bg-indigo-600 hover:bg-indigo-700 text-white">
                    <LogoutButton />
                  </Button>
                </>
              ) : (
                <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                  <User className="w-4 h-4 mr-2" />
                  <LoginButton />
                </Button>
              )}
            </div>
          </div>
        </div>
      </nav>
      
      <main className="container mx-auto px-4 py-8">
        {isAuthenticated ? (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            <div className="md:col-span-3 space-y-6">
              <Card className="shadow-lg border-0">
                <CardHeader className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white rounded-t-lg">
                  <CardTitle className="flex items-center">
                    <Wallet className="w-5 h-5 mr-2" />
                    Your Wallet
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <WalletInfo />
                </CardContent>
              </Card>
            </div>
            
            <div className="md:col-span-2">
              <Card className="shadow-lg border-0">
                <CardHeader className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white rounded-t-lg">
                  <CardTitle className="flex items-center">
                    <ExternalLink className="w-5 h-5 mr-2" />
                    Recent Transactions
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <TransactionsTable />
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          <Card className="max-w-md mx-auto mt-10 shadow-lg border-0">
            <CardHeader className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white rounded-t-lg">
              <CardTitle>Welcome to Zero-X</CardTitle>
            </CardHeader>
            <CardContent className="p-6 text-center">
              <p className="mb-4 text-gray-600">Please login to access your wallet and transactions</p>
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                <User className="w-4 h-4 mr-2" />
                <LoginButton />
              </Button>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}