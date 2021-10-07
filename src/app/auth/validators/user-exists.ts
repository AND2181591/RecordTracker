import { Injectable } from "@angular/core";
import { Validator } from "@angular/forms";

Injectable({providedIn: 'root'})
export class UserExists implements Validator {
    validate() {
        return null;
    }
}