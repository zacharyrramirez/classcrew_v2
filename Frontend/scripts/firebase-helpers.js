// Firebase Helper Functions
// Common operations for user management and data storage

// Create or update user document in Firestore
async function saveUserToFirestore(user, additionalData = {}) {
    try {
        const userRef = firebaseDb.collection('users').doc(user.uid);
        const doc = await userRef.get();
        
        if (!doc.exists) {
            // Create new user document
            await userRef.set({
                uid: user.uid,
                email: user.email,
                displayName: user.displayName || '',
                photoURL: user.photoURL || '',
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                plan: 'basic',
                assignmentsGraded: 0,
                ...additionalData
            });
            console.log('New user document created');
        } else {
            // Update existing user document
            await userRef.update({
                lastLogin: firebase.firestore.FieldValue.serverTimestamp(),
                ...additionalData
            });
            console.log('User document updated');
        }
    } catch (error) {
        console.error('Error saving user to Firestore:', error);
        throw error;
    }
}

// Get user data from Firestore
async function getUserData(userId) {
    try {
        const userDoc = await firebaseDb.collection('users').doc(userId).get();
        if (userDoc.exists) {
            return userDoc.data();
        } else {
            console.log('No user document found');
            return null;
        }
    } catch (error) {
        console.error('Error getting user data:', error);
        throw error;
    }
}

// Update user profile
async function updateUserProfile(userId, data) {
    try {
        await firebaseDb.collection('users').doc(userId).update(data);
        console.log('User profile updated successfully');
        return true;
    } catch (error) {
        console.error('Error updating user profile:', error);
        throw error;
    }
}

// Create assignment
async function createAssignment(userId, assignmentData) {
    try {
        const assignmentRef = await firebaseDb.collection('assignments').add({
            userId: userId,
            title: assignmentData.title,
            description: assignmentData.description || '',
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            status: 'pending',
            grade: null,
            feedback: null,
            ...assignmentData
        });
        console.log('Assignment created with ID:', assignmentRef.id);
        return assignmentRef.id;
    } catch (error) {
        console.error('Error creating assignment:', error);
        throw error;
    }
}

// Get user's assignments
async function getUserAssignments(userId) {
    try {
        const snapshot = await firebaseDb.collection('assignments')
            .where('userId', '==', userId)
            .orderBy('createdAt', 'desc')
            .get();
        
        const assignments = [];
        snapshot.forEach(doc => {
            assignments.push({
                id: doc.id,
                ...doc.data()
            });
        });
        return assignments;
    } catch (error) {
        console.error('Error getting assignments:', error);
        throw error;
    }
}

// Update assignment
async function updateAssignment(assignmentId, data) {
    try {
        await firebaseDb.collection('assignments').doc(assignmentId).update(data);
        console.log('Assignment updated successfully');
        return true;
    } catch (error) {
        console.error('Error updating assignment:', error);
        throw error;
    }
}

// Delete assignment
async function deleteAssignment(assignmentId) {
    try {
        await firebaseDb.collection('assignments').doc(assignmentId).delete();
        console.log('Assignment deleted successfully');
        return true;
    } catch (error) {
        console.error('Error deleting assignment:', error);
        throw error;
    }
}

// Sign out user
async function signOut() {
    try {
        await firebaseAuth.signOut();
        console.log('User signed out');
        window.location.href = 'index.html';
    } catch (error) {
        console.error('Error signing out:', error);
        throw error;
    }
}

// Check if user is authenticated
function checkAuth(redirectToAuth = false) {
    return new Promise((resolve) => {
        firebaseAuth.onAuthStateChanged((user) => {
            if (user) {
                resolve(user);
            } else {
                if (redirectToAuth) {
                    window.location.href = 'auth.html';
                }
                resolve(null);
            }
        });
    });
}

// Get current user
function getCurrentUser() {
    return firebaseAuth.currentUser;
}

// Update user's plan (after payment)
async function updateUserPlan(userId, plan) {
    try {
        await firebaseDb.collection('users').doc(userId).update({
            plan: plan,
            planUpdatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        console.log('User plan updated to:', plan);
        return true;
    } catch (error) {
        console.error('Error updating user plan:', error);
        throw error;
    }
}

// Increment assignments graded counter
async function incrementAssignmentsGraded(userId) {
    try {
        await firebaseDb.collection('users').doc(userId).update({
            assignmentsGraded: firebase.firestore.FieldValue.increment(1)
        });
        console.log('Assignments graded counter incremented');
        return true;
    } catch (error) {
        console.error('Error incrementing assignments graded:', error);
        throw error;
    }
}
