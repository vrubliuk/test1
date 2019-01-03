import { delay } from "redux-saga";
import { put, select } from "redux-saga/effects";
import * as actions from "../actions/index"
import * as API from "../../API";

export function* saveContacts() {
  yield delay(2000)
  const {location, phone, email, github, linkedIn} = yield select(store => store.profile.contacts)
  try {
    yield API.putContacts(location, phone, email, github, linkedIn);
  } catch (err) {
    alert(err);
  }
}

export function* saveEducation() {
  yield delay(2000)
  const {speciality, institution, startDate, endDate} = yield select(store => store.profile.education)
  try {
    yield API.putEducation(speciality, institution, startDate, endDate);
  } catch (err) {
    alert(err);
  }
}
