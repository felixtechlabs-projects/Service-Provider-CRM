import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../environments/environment";
import { addDoc, collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";


export const addCustomer = async (customer) => {
    try {
        const userResponse = await createUserWithEmailAndPassword(auth, customer.email, customer.password);
        const id = userResponse.user.uid;
        customer.id = id;
        await setDoc(doc(db, "customers", id), Object.assign({}, customer));
        console.log("Customer added");
    } catch(error) {
        console.log(error);
    }
}


export const signinCustomer = async (email, password) => {
    try {
        const userResponse = await signInWithEmailAndPassword(auth, email, password);
        const id = userResponse.user.uid;
        const docSnap = await getDoc(doc(db, "customers", id));
        const val = docSnap.data();
        return val;
    } catch(error) {
        console.log(error);
    }
}

export const addReview = async (review) => {
    try {
        await addDoc(collection(db, "reviews"), Object.assign({}, review));
        console.log("Review added");
    } catch(error) {
        console.log(error);
    }
}

export const bookASlot = async (slotId) => {
    try {
        const id = auth.currentUser.uid;
        await updateDoc(doc(db, "slots", slotId), {
            isBooked: true,
            customerId: id
        })
        console.log("Slot booked");
    } catch(error) {
        console.log(error);
    }
}

export const showMyBookings = async () => {
    const id = auth.currentUser.uid;
    try {
        let bookings = [];
        const q = query(collection(db, "slots"), where("customerId", "==", id));
        const slotSnap = await getDocs(q);

        // Use Promise.all to handle async calls inside the loop
        const bookingPromises = slotSnap.docs.map(async (slotsn) => {
            var slot = slotsn.data();
            slot.id = slotsn.id;
            // getDoc requires a doc reference, not separate arguments
            const spRef = doc(db, "service_providers", slot.serviceProviderId);
            const spSnap = await getDoc(spRef);

            if (spSnap.exists()) { // length
                var serviceProvider = spSnap.data();
                slot.serviceProviderName = serviceProvider.name;  // fixed typo
                slot.serviceProviderRole = serviceProvider.role;
            }

            return slot; // promise
        });

        bookings = await Promise.all(bookingPromises);
        return bookings;
    } catch (error) {
        console.log(error);
    }
};