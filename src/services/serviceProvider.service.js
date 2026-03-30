import { addDoc, collection, doc, getDoc, getDocs, query, setDoc, where } from "firebase/firestore";
import { auth, db } from "../../environments/environment";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

export const addServiceProvider = async (serviceProvider) => {
    try {
        const spResponse = await createUserWithEmailAndPassword(auth, serviceProvider.email, serviceProvider.password);
        const id = spResponse.user.uid;
        serviceProvider.id = id;
        await setDoc(doc(db, "service_providers", id), Object.assign({}, serviceProvider));
        console.log("service provider added");
    } catch(error) {
        console.log(error);
    }
}

export const signinServiceProvider = async (email, password) => {
    try {
        const userResponse = await signInWithEmailAndPassword(auth, email, password);
        const id = userResponse.user.uid;
        const docSnap = await getDoc(doc(db, "service_providers", id));
        const val = docSnap.data();
        return val;
    } catch(error) {
        console.log(error);
    }
}

export const addSlot = async(slot) => {
    try {
        const serviceProviderId = auth.currentUser.uid;
        slot.serviceProviderId = serviceProviderId;
        await addDoc(collection(db, "slots"), Object.assign({}, slot));
        console.log("slot added");
    } catch(error) {
        console.log(error);
    }
}

export const fetchAllServiceProviders = async () => {
    try {
        const sps = await getDocs(collection(db, "service_providers"));
        let allSps = [];
        sps.forEach((sp) => {
            const val = sp.data();
            allSps.push(val);
        })
        return allSps;
    } catch(error) {
        console.log(error);
    }
}

function toDate(ts) {
  // Convert seconds to ms and add nanoseconds converted to ms
  return new Date(ts.seconds * 1000 + ts.nanoseconds / 1000000);
}

export const fetchSlotsForId = async (id) => {
    try {
        const q = query(collection(db, "slots"), where("serviceProviderId", "==", id), where("isBooked", "==", false));
        const slotsnaps = await getDocs(q);
        let slots = [];
        slotsnaps.forEach(snap => {
            let slot = snap.data();
            slot.id = snap.id;
            slot.date = toDate(slot.date);
            slots.push(slot);
        })
        return slots;
    } catch(error) {
        console.log(error);
    }
}

export const fetchProviderDashboardData = async () => {
    try {
        const serviceProviderId = auth.currentUser.uid;
        
        const q = query(
            collection(db, "slots"), 
            where("serviceProviderId", "==", serviceProviderId)
        );
        
        const querySnapshot = await getDocs(q);
        
        const dashboardData = await Promise.all(querySnapshot.docs.map(async (docSnap) => {
            let slot = docSnap.data();
            slot.id = docSnap.id; 

            if (slot.date) {
                slot.date = toDate(slot.date);
            }

            // 1. Fetch Customer Details if booked
            if (slot.isBooked && slot.customerId) {
                try {
                    const customerDoc = await getDoc(doc(db, "customers", slot.customerId));
                    slot.customerDetails = customerDoc.exists() 
                        ? customerDoc.data() 
                        : { name: "Unknown Customer" };
                } catch (err) {
                    slot.customerDetails = { name: "Error loading name" };
                }

                // 2. Fetch Review for this specific slot
                try {
                    // Assuming your reviews collection has a 'slotId' field
                    const reviewQuery = query(
                        collection(db, "reviews"), 
                        where("slotId", "==", slot.id)
                    );
                    const reviewSnap = await getDocs(reviewQuery);
                    
                    if (!reviewSnap.empty) {
                        // Taking the first review found for this slot
                        slot.review = reviewSnap.docs[0].data();
                    } else {
                        slot.review = null; // No review yet
                    }
                } catch (err) {
                    console.error("Error fetching review:", err);
                    slot.review = null;
                }
            }

            return slot;
        }));

        return dashboardData.sort((a, b) => a.date - b.date);
        
    } catch (error) {
        console.error("Error fetching dashboard data:", error);
        throw error;
    }
};