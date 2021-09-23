import { Injectable, NgZone } from '@angular/core';
import { Router } from "@angular/router";

import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Subject } from 'rxjs';

import { User } from '../shared/models/User';


interface SignUpForm {
    email: string;
    username: string;
    password: string;
    passwordConfirmation: string;
}

interface SignInForm {
    email: string;
    password: string;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {

    userData: any; // Save logged in user data
    isUserData = new Subject<boolean>();

    constructor(
        public afs: AngularFirestore,   // Inject Firestore service
        public afAuth: AngularFireAuth, // Inject Firebase auth service
        public router: Router,  
        public ngZone: NgZone // NgZone service to remove outside scope warning
    ) {    
        /* Saving user data in localstorage when 
        logged in and setting up null when logged out */
        this.afAuth.authState.subscribe(user => {
            if (user) {
                this.userData = user;
                localStorage.setItem('user', JSON.stringify(this.userData));
                JSON.parse(localStorage.getItem('user') || 'null');
                this.isUserData.next(true);
                console.log("You are still logged in", this.userData);
            } else {
                localStorage.setItem('user', '');
                JSON.parse(localStorage.getItem('user') || 'null');
                this.isUserData.next(false);
                console.log("You are no longer logged in", this.userData);
            }
            // setTimeout(() => {
            //     if (user) {
            //         this.userData = user;
            //         localStorage.setItem('user', JSON.stringify(this.userData));
            //         JSON.parse(localStorage.getItem('user') || 'null');
            //         console.log("You are still logged in", this.userData);
            //     } else {
            //         localStorage.setItem('user', '');
            //         JSON.parse(localStorage.getItem('user') || 'null');
            //         console.log("You are no longer logged in", this.userData);
            //     }
            // }, 1000);
            
        });
    }




    // Sign in with email/password
    signIn(signInForm: SignInForm) {
        return this.afAuth.signInWithEmailAndPassword(signInForm.email, signInForm.password)
        .then((result) => {
            this.isUserData.next(true);
            this.setUserData(result.user!)
                .then(() => {
                    this.router.navigate(["/home"]);
                    console.log("logged in");
                });
        }).catch((error) => {
            window.alert(error.message)
        });
    } 




    // Sign up with email/password
    signUp(signUpForm: SignUpForm) {
        return this.afAuth.createUserWithEmailAndPassword(signUpForm.email, signUpForm.password)
        .then((result) => {
            /* Call the SendVerificaitonMail() function when new user sign 
            up and returns promise */
            // this.sendVerificationMail();
            this.isUserData.next(true);
            this.router.navigateByUrl("/home");
            result.user?.updateProfile({
                displayName: signUpForm.username
            }).then(() => {
                this.setUserData(result.user!);
            });
        }).catch((error) => {
            window.alert(error.message)
        })
    }

    // Send email verfificaiton when new user sign up
    // SendVerificationMail() { 
    //     return this.afAuth.sendSignInLinkToEmail()
    //         .then(() => {
    //             this.router.navigate(['verify-email-address']);
    //         })
    // }




    // Reset Forgot password
    forgotPassword(passwordResetEmail: string) {
        return this.afAuth.sendPasswordResetEmail(passwordResetEmail)
            .then(() => {
                window.alert('Password reset email sent, check your inbox.');
            }).catch((error) => {
                window.alert(error)
            }
        );
    }

    // Returns true when user is logged in and email is verified
    get isLoggedIn(): boolean {
        const user = JSON.parse(localStorage.getItem('user') || 'null');
        return (user !== null) ? true : false;
    }




    /* Setting up user data when sign in with username/password, 
    sign up with username/password and sign in with social auth  
    provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
    setUserData(user: User) {
        const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
        const userData: User = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName
        }
        return userRef.set(userData, {
            merge: true
        });
    }




    // Sign out 
    signOut() {
        return this.afAuth.signOut()
            .then(() => {
                this.isUserData.next(false);
                localStorage.removeItem('user');
                this.router.navigateByUrl("/");
            }
        );
    }
}