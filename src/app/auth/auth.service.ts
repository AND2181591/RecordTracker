import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Subject } from 'rxjs';

import { User } from '../shared/models/User';
import { ModalGenericComponent } from '../shared/modal-generic/modal-generic.component';


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

    userData: any; // Save logged in user data when the user signs in
    isUserData = new Subject<boolean>(); 

    constructor(
        public afs: AngularFirestore,   // Inject Firestore service
        public afAuth: AngularFireAuth, // Inject Firebase auth service
        public router: Router,  
        private modalGen: MatDialog
    ) {    
        /* Saving user data in localstorage when 
        logged in and setting up null when logged out */
        this.afAuth.authState.subscribe(user => {
            if (user) {
                this.userData = user;
                localStorage.setItem('user', JSON.stringify(this.userData));
                JSON.parse(localStorage.getItem('user') || 'null');
                this.isUserData.next(true);
            } else {
                localStorage.setItem('user', '');
                JSON.parse(localStorage.getItem('user') || 'null');
                this.isUserData.next(false);
            }
        });
    }

    // Returns true when user is logged in. Used for the Auth Guard.
    get isLoggedIn(): boolean {
        const user = JSON.parse(localStorage.getItem('user') || 'null');
        return (user !== null) ? true : false;
    }

    get currentUser(): User {
        return this.userData;
    }


    // Sign in with email/password
    signIn(signInForm: SignInForm) {
        return this.afAuth.signInWithEmailAndPassword(signInForm.email, signInForm.password)
            .then((result) => {
                this.isUserData.next(true);
                this.setUserData(result.user!)
                    .then(() => {
                        this.router.navigateByUrl("/home");
                    });
            }).catch(error => {
                this.errorModal(error); // Modal Generic launches to inform the user
            });
    }


    // Sign up with email/password
    signUp(signUpForm: SignUpForm) {
        return this.afAuth.createUserWithEmailAndPassword(signUpForm.email, signUpForm.password)
            .then((result) => {
                this.isUserData.next(true);
                this.setUserData(result.user!);
                result.user?.updateProfile({
                    displayName: signUpForm.username
                }).then(() => {
                    this.router.navigateByUrl("/home");
                });
            }).catch(error => {
                this.errorModal(error); // Modal Generic launches to inform the user
            });
    }


    // Setting up user data when signin and signout methods run
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



    private errorModal(error: any) {
        const modalGenConfig = new MatDialogConfig();

        modalGenConfig.disableClose = true;
        modalGenConfig.autoFocus = true;
        modalGenConfig.minWidth = '200px';
        modalGenConfig.position = {
          top: '50vh', 
          left: '50vw'
        }
        modalGenConfig.panelClass = 'makeItMiddle';

        modalGenConfig.data = {
          type: 'Error', 
          message: error.message
        }

        this.modalGen.open(ModalGenericComponent, modalGenConfig);
    }
}