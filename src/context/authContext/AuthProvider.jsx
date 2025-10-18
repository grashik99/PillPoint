import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "../../firebase/firebase.config";
import axios from "axios";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userType, setUserType] = useState("Customer");
  const [userFromMongo, setUserFromMongo] = useState(null);
  const [company, setCompany] = useState([]);
  const [refrash, setRefrash] = useState(0);
  const [categories, setCategories] = useState([]);
  const [medicines, setMedicines] = useState([]);
  const [myMedicines, setMyMedicines] = useState([]);
  const [userCart, setUserCart] = useState([]);
  const [cartCost, setCartCost] = useState(0);
  const [orders, setOrders] = useState([]);
  const [banners, setBanners] = useState([]);

  const googleProvider = new GoogleAuthProvider();

  // create user with email and password.
  const createUserWithEmail = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // login
  const logIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // logout
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  // Login with google
  const logInWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };

  // userType

  // observer.
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      unSubscribe();
    };
  }, []);

  // User Type effect
  useEffect(() => {
    if (user) {
      fetch(`https://pill-point-server-one.vercel.app/user?email=${user?.email}`, {
        headers: {
          Authorization: `Bearer ${user?.accessToken}`,
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setUserType(data.userType);
          setUserFromMongo(data);
        });
    }
  }, [user, refrash]);

  // Category
  useEffect(() => {
    axios
      .get("https://pill-point-server-one.vercel.app/categories", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setCategories(res.data);
      })
      // .catch((err) => console.log(err));
  }, [refrash]);

  //Company
  useEffect(() => {
    user &&
      axios
        .get("https://pill-point-server-one.vercel.app/company")
        .then((res) => setCompany(res.data));
  }, [refrash, user]);

  // Mdicines
  useEffect(() => {
    axios.get("https://pill-point-server-one.vercel.app/medicines").then((res) => {
      setMedicines(res.data);
      const x = res.data.filter((y) => y.sellerEmail === user?.email);
      setMyMedicines(x);
    });
  }, [refrash, user]);

  // My Cart
  useEffect(() => {
    userFromMongo?.cart.length &&
      axios
        .post("https://pill-point-server-one.vercel.app/cart/medicines", userFromMongo?.cart)
        .then((res) => {
          setUserCart(res.data);
        })
        // .catch((err) => console.log(err));
  }, [userFromMongo, refrash]);

  // Cart Amount
  useEffect(() => {
    if (userFromMongo?.cart?.length && medicines?.length) {
      const totalCost = userFromMongo.cart.reduce((acc, item) => {
        const medicine = medicines.find((m) => m._id === item.medicineId);
        if (medicine) {
          const perUnitPrice = medicine.perUnitPrice;
          const discount = parseInt(medicine.discount) || 0;
          const netPrice = perUnitPrice * (1 - discount / 100);
          return acc + netPrice * item.cartQuantity;
        }
        return acc;
      }, 0);

      setCartCost(totalCost.toFixed(2)); // set state once
    }
  }, [userFromMongo, medicines, refrash]);

  // Orders

  useEffect(() => {
    axios
      .get("https://pill-point-server-one.vercel.app/allOrders")
      .then((res) => setOrders(res.data));
  }, [refrash]);

  // Banners
  useEffect(() => {
    axios.get("https://pill-point-server-one.vercel.app/banners").then((res) => {
      setBanners(res.data);

      const bannerMedicinesWithApproval = medicines
        .filter((med) => res.data.some((b) => b.id === med._id))
        .map((med) => {
          const banner = res.data.find((b) => b.id === med._id);
          return {
            ...med,
            approval: banner ? banner.approval : false,
            bannerId: banner._id
          };
        });

      setBanners(bannerMedicinesWithApproval);
    });
  }, [refrash, medicines]);

  const authInformation = {
    user,
    setUser,
    createUserWithEmail,
    logIn,
    logOut,
    loading,
    setLoading,
    logInWithGoogle,
    userType,
    userFromMongo,
    company,
    setCompany,
    refrash,
    setRefrash,
    categories,
    setCategories,
    medicines,
    setMedicines,
    myMedicines,
    setMyMedicines,
    userCart,
    setUserCart,
    cartCost,
    setCartCost,
    orders,
    setOrders,
    banners,
    setBanners,
  };

  
  return <AuthContext value={authInformation}>{children}</AuthContext>;
};
export default AuthProvider;
