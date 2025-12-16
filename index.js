var imageInput = document.getElementById("imageInput");
var contactNameInput = document.getElementById("fullName");
var contactPhoneNumberInput = document.getElementById("PhoneNumber");
var contactEmailInput = document.getElementById("Email");
var contactAddressInput = document.getElementById("Address");
var contactGroupInput = document.getElementById("contactGroup");
var NotesInput = document.getElementById("Notes");
var favoriteContactInput = document.getElementById("favorite");
var emergencyContactInput = document.getElementById("emergency");
var imageLivePrev = document.getElementById("imageLivePrev");
var addBtn = document.getElementById("addBtn");
var updateBtn = document.getElementById("updateBtn");
var allContacts = JSON.parse(localStorage.getItem("all contacts")) || [];
var contactToBeUpdated;
var errName = document.getElementById("errName");
var errPhonenumber = document.getElementById("errPhoneNumber");
var errEmail = document.getElementById("errEmail");

displayContacts();

// ~ Display Contacts
function displayContacts(arr = allContacts) {
  var totalMarkUp = "";
  if (arr.length === 0) {
    totalMarkUp += `
                      <div class="text-center noContactFound">
                    <div
                      class="d-flex noContactIcon align-items-center justify-content-center m-auto mb-3"
                    >
                      <i class="fa-solid fa-address-book"></i>
                    </div>
                    <p class="m-0 fw-bold text-gray">No contacts found</p>
                    <p class="m-0 text-gray">
                      Click "Add Contact" to get started
                    </p>
                  </div>
    `;
  }
  for (var i = 0; i < arr.length; i++) {
    var selectedGroupe = "";
    var displayImage = "";
    var displayEmail = "";
    var displayAddress = "";
    var emailButton = "";
    var checkedImage = "";
    // ! Display Image

    var badges = "";
    // ! Favorite badge
    if (arr[i].favorite) {
      badges += `<div class="position-absolute top-0 end-0 bg-warning rounded-circle d-flex align-items-center justify-content-center" style="width: 20px; height: 20px; border: 1px solid white;"><i class="fa-solid fa-star text-white" style="font-size: 8px;"></i></div>`;
    }
    // ! Emergency badge
    if (arr[i].emergency) {
      badges += `<div class="position-absolute bottom-0 end-0 bg-danger rounded-circle d-flex align-items-center justify-content-center" style="width: 20px; height: 20px; border: 1px solid white;"><i class="fa-solid fa-heart-pulse text-white" style="font-size: 8px;"></i></div>`;
    }
    if (arr[i].image) {
      displayImage = `<div class="cardImage position-relative">
                              <div
                                class=" image d-flex align-items-center justify-content-center fw-bolder rounded-4 text-white overflow-hidden object-fit-cover"
                                
                              >
                                <img src="${arr[i].image}" alt="" class="w-100">
                              </div>
                              ${badges}
                            </div>`;
    } else {
      displayImage = `<div id="cardImage" class="position-relative">
                              <div
                                class=" default-image image d-flex align-items-center justify-content-center fw-bolder rounded-4 text-white overflow-hidden object-fit-cover"
                                
                              >
                              ${getInitials(arr[i].fullName)}
                              </div>
                              ${badges}
                            </div>`;
    }

    // ! Display Email
    if (arr[i].emailAdress) {
      displayEmail = `
      <div class="d-flex gap-2 align-items-center">
        <div class="email-icon d-flex align-items-center justify-content-center rounded-3">
          <i class="fa-solid fa-envelope"></i>
        </div>
        <span class="text-gray">${arr[i].emailAdress}</span>
      </div> `;
    }

    // ! Email Botton
    if (arr[i].emailAdress) {
      emailButton = `
      <a
                              href="mailto:${arr[i].emailAdress}"
                              class="email-icon d-flex align-items-center justify-content-center rounded-3 border-0"
                            >
                              <i class="fa-solid fa-envelope"></i>
                            </a>
      `;
    }

    // ! display Address
    if (arr[i].address) {
      displayAddress = `
      <div class="d-flex gap-2 align-items-center">
                              <div
                                class="location-icon d-flex align-items-center justify-content-center rounded-3"
                              >
                                <i class="fa-solid fa-location-dot"></i>
                              </div>
                              <span class="text-gray">${arr[i].address}</span>
                            </div>
      `;
    }
    // ! selected Group
    if (arr[i].group == "family") {
      selectedGroupe = `<span class="family-select selected-group">${arr[i].group}</span>`;
    } else if (arr[i].group == "work") {
      selectedGroupe = `<span class="work-select selected-group">${arr[i].group}</span>`;
    } else if (arr[i].group == "friends") {
      selectedGroupe = `<span class="friend-select selected-group">${arr[i].group}</span>`;
    } else if (arr[i].group == "school") {
      selectedGroupe = `<span class="school-select selected-group">${arr[i].group}</span>`;
    } else if (arr[i].group == "other") {
      selectedGroupe = `<span class="other-select selected-group">${arr[i].group}</span>`;
    }
    if (arr[i].emergency) {
      selectedGroupe += `<span class="ms-2 d-flex align-items-center gap-1" style="color: #ff2056; background-color:#FFF1F2; padding:4px 8px; font-size:11px; border-radius:6px;"><i class="fa-solid fa-heart-pulse" ></i> emergency</span>`;
    }
    // ! Checked Image
    if (arr[i].image) {
      checkedImage = `
                              <div
                          class="flex-shrink-0  image d-flex align-items-center justify-content-center fw-bolder rounded-4 text-white overflow-hidden object-fit-cover"
                        >
                          <img
                            src="${arr[i].image}"
                            alt=""
                            class="w-100 h-100"
                          />
                        </div>
      `;
    } else {
      checkedImage = `
        <div
              class="flex-shrink-0 default-image image d-flex align-items-center justify-content-center fw-bolder rounded-4 text-white overflow-hidden object-fit-cover"
                        >
                          ${getInitials(arr[i].fullName)}
                        </div>
      `;
    }
    var starIcon;
    if (arr[i].favorite) {
      starIcon = '<i class="fa-solid fa-star" style="color: #ffb900;"></i>';
    } else {
      starIcon = '<i class="fa-regular fa-star text-gray"></i>';
    }
    var heartIcon;
    if (arr[i].emergency) {
      heartIcon =
        '<i class="fa-solid fa-heart-pulse" style="color: #ff2056;"></i>';
    } else {
      heartIcon = '<i class="fa-regular fa-heart text-gray"></i>';
    }
    totalMarkUp += `
    <div class="col-md-6">
                    <div
                      class="d-flex flex-column contact-card overflow-hidden"
                    >
                      <div class="p-3">
                        <div>
                          <div class="d-flex column-gap-3 align-items-center">
                            ${displayImage}
                            <div>
                              <h3 class="fs-6 fw-bold">${arr[i].fullName}</h3>
                              <div class="d-flex gap-2 align-items-center">
                                <div
                                  class="phone-icon d-flex justify-content-center align-items-center rounded-3"
                                >
                                  <i class="fa-solid fa-phone"></i>
                                </div>
                                <span class="text-gray">${arr[i].phoneNumber}</span>
                              </div>
                            </div>
                          </div>
                          <div class="mt-3">
                            ${displayEmail}
                          </div>
                          <div class="mt-2">
                            ${displayAddress}
                          </div>
                          <div class="mt-2 d-flex">
                          ${selectedGroupe}
                          </div>
                        </div>
                      </div>
                        <div class="p-3 bottom-card">
                          <div
                            class="d-flex justify-content-between align-items-center"
                          >
                            <div class="d-flex gap-2">
                              <a
                                href="tel:${arr[i].phoneNumber}"
                                class="phone-icon d-flex justify-content-center align-items-center rounded-3 border-0"
                              >
                                <i class="fa-solid fa-phone"></i>
                              </a>
                              ${emailButton}
                            </div>
                            <div class="d-flex gap-2 text-gray">
                              <button class="border-0  rounded-1 transition-02" onclick="toggleFavorite(${i})">
                                ${starIcon}
                              </button>
                              <button class="border-0  rounded-1 transition-02" onclick="toggleEmergency(${i})">
                                ${heartIcon}
                              </button>
                              <button class="border-0  rounded-1 transition-02"  onclick="setFormForUpdate(${arr[i].id})"  data-bs-toggle="modal" data-bs-target="#scrollModal ">
                                <i class="fa-solid fa-pen text-gray"></i>
                              </button>
                              <button class="border-0  rounded-1 transition-02" onclick="DeleteContact('${arr[i].id}')">
                                <i class="fa-solid fa-trash text-gray"></i>
                              </button>
                            </div>
                          </div>
                        </div>
                    </div>
                  </div>
    `;
  }
  document.getElementById("contacts-grid").innerHTML = totalMarkUp;
  document.getElementById("totalNumber").innerHTML = allContacts.length;
  document.getElementById("manageContactTxt").innerHTML = `
  Manage and organize your ${allContacts.length} contacts
  `;
  displayFavorite();
  displayEmergency();
}

// ~ Changing toggle Favorite onclick
function toggleFavorite(index) {
  allContacts[index].favorite = !allContacts[index].favorite;
  displayContacts();
  saveIntoLocalStorage();
}
// ~ Changing toggle Emergency onclick
function toggleEmergency(index) {
  allContacts[index].emergency = !allContacts[index].emergency;
  displayContacts();
  saveIntoLocalStorage();
}

// ~ Display into Favorite section and counter
function displayFavorite() {
  var favList = allContacts.filter(function (contact) {
    return contact.favorite;
  });
  var favCount = favList.length;
  var favMarkUp = "";
  for (var i = 0; i < favList.length; i++) {
    var checkedImage;
    if (favList[i].image) {
      checkedImage = `<div class="flex-shrink-0 image d-flex align-items-center justify-content-center fw-bolder rounded-4 text-white overflow-hidden object-fit-cover"><img src="${favList[i].image}" alt="" class="w-100 h-100"/></div>`;
    } else {
      checkedImage = `<div class="flex-shrink-0 default-image image d-flex align-items-center justify-content-center fw-bolder rounded-4 text-white overflow-hidden object-fit-cover">${getInitials(
        favList[i].fullName
      )}</div>`;
    }
    favMarkUp += `<div class="d-flex gap-2 fav-cont align-items-center mb-3">${checkedImage}<div class="flex-grow-1"><h4 class="m-0 fs-6">${favList[i].fullName}</h4><p class="m-0 phone-number">${favList[i].phoneNumber}</p></div><a href="tel:${favList[i].phoneNumber}" class="d-flex phone-icon align-items-center justify-content-center flex-shrink-0"><i class="fa-solid fa-phone"></i></a></div>`;
  }
  if (favCount === 0) {
    favMarkUp = `<div class="emptysectext text-center"><p class="text-gray fw-bold">No favorites yet</p></div>`;
  }
  document.getElementById("favorites-contacts").innerHTML = favMarkUp;
  document.getElementById("favoriteNumber").innerHTML = favCount;
}

// ~ Display into Emergency section and counter
function displayEmergency() {
  var emergencyList = allContacts.filter(function (contact) {
    return contact.emergency;
  });
  var emergencyCount = emergencyList.length;
  var emergencyMarkUp = "";
  for (var i = 0; i < emergencyList.length; i++) {
    var checkedImage;
    if (emergencyList[i].image) {
      checkedImage = `<div class="flex-shrink-0 image d-flex align-items-center justify-content-center fw-bolder rounded-4 text-white overflow-hidden object-fit-cover">
      <img src="${emergencyList[i].image}" alt="" class="w-100 h-100"/>
      </div>`;
    } else {
      checkedImage = `<div class="flex-shrink-0 default-image image d-flex align-items-center justify-content-center fw-bolder rounded-4 text-white overflow-hidden object-fit-cover">
      ${getInitials(emergencyList[i].fullName)}
      </div>`;
    }
    emergencyMarkUp += `<div class="d-flex gap-2 emergency-cont align-items-center mb-3">${checkedImage}<div class="flex-grow-1"><h4 class="m-0 fs-6">${emergencyList[i].fullName}</h4><p class="m-0 phone-number">${emergencyList[i].phoneNumber}</p></div><a href="tel:${emergencyList[i].phoneNumber}" class="d-flex phone-icon align-items-center justify-content-center flex-shrink-0"><i class="fa-solid fa-phone"></i></a></div>`;
  }
  if (emergencyCount === 0) {
    emergencyMarkUp = `<div class="emptysectext text-center"><p class="text-gray fw-bold">No emergency contacts</p></div>`;
  }
  document.getElementById("emergency-contacts").innerHTML = emergencyMarkUp;
  document.getElementById("emergencyCount").innerHTML = emergencyCount;
}

// ~ Check favorite
function isFavorite() {
  return favoriteContactInput.checked;
}

// ~ Check emergency
function isEmergency() {
  return emergencyContactInput.checked;
}

// ~ Add Contact
function addContact() {
  if (checkDuplicateNumber()) {
    swal(
      "Error",
      "This phone number already exists in your contacts.",
      "error"
    );
    return;
  }
  if (validateForm()) {
    if (imageInput.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(imageInput.files[0]);

      reader.onload = function () {
        var contact = {
          id: Date.now(),
          fullName: contactNameInput.value,
          phoneNumber: contactPhoneNumberInput.value,
          emailAdress: contactEmailInput.value,
          address: contactAddressInput.value,
          group: contactGroupInput.value,
          note: NotesInput.value,
          image: reader.result,
          emergency: isEmergency(),
          favorite: isFavorite(),
        };
        allContacts.push(contact);
        console.log(allContacts);
        clearFrom();
        displayContacts();
        saveIntoLocalStorage();
        swal("Success", "Contact added successfully!", "success");
      };
    } else {
      var contact = {
        id: Date.now(),
        fullName: contactNameInput.value,
        phoneNumber: contactPhoneNumberInput.value,
        emailAdress: contactEmailInput.value,
        address: contactAddressInput.value,
        group: contactGroupInput.value,
        note: NotesInput.value,
        image: null,
        emergency: isEmergency(),
        favorite: isFavorite(),
      };
      allContacts.push(contact);
      console.log(allContacts);
      clearFrom();
      displayContacts();
      saveIntoLocalStorage();
      swal({
        title: "",
        text: "Contact deleted successfully",
        icon: "success",
        timer: 1000,
        buttons: false,
      });
    }
  } else {
    swal("Error", "Please fix the errors in the form before saving.", "error");
  }
}

// ~ clear form
function clearFrom() {
  imageInput.value = null;
  contactNameInput.value = null;
  contactPhoneNumberInput.value = null;
  contactEmailInput.value = null;
  contactGroupInput.value = null;
  contactAddressInput.value = null;
  NotesInput.value = null;
  favoriteContactInput.checked = false;
  emergencyContactInput.checked = false;
  imageLivePrev.innerHTML = `
  <div class="default-image rounded-circle d-flex align-items-center justify-content-center h-100 over-flow-hidden">
    <i class="fa-solid fa-user text-white fs-2"></i>
  </div>
`;
  addBtn.classList.replace("d-none", "d-block");
  updateBtn.classList.replace("d-block", "d-none");
  contactNameInput.classList.remove("is-invalid");
  errName.classList.add("d-none");
  contactEmailInput.classList.remove("is-invalid");
  errEmail.classList.add("d-none");
  contactPhoneNumberInput.classList.remove("is-invalid");
  errPhonenumber.classList.add("d-none");
}

// ~ image preview
imageInput.onchange = function () {
  var reader = new FileReader();
  reader.readAsDataURL(imageInput.files[0]);
  reader.onload = function () {
    imageLivePrev.innerHTML = `
    <div class="default-image rounded-circle d-flex align-items-center justify-content-center h-100 overflow-hidden">
  <img
    src="${reader.result}"
    alt=""
    class="position-absolute w-100 h-100 top-0 start-0 bottom-0 end-0 rounded-24px object-fit-cover"
  />
    </div>
`;
  };
};

// ~ save into local storage
function saveIntoLocalStorage() {
  localStorage.setItem("all contacts", JSON.stringify(allContacts));
}

// ~ Delete Contact
function DeleteContact(id) {
  allContacts = allContacts.filter(function (contact) {
    return contact.id != id;
  });
  displayContacts();
  saveIntoLocalStorage();
}

// ~ Searching
function search(term) {
  var searchingList = allContacts.filter(function (contact) {
    return contact.fullName.toLowerCase().includes(term.toLowerCase());
  });
  displayContacts(searchingList);
  console.log(searchingList);
}

// ~ Making the default image has first char || first two char of the litters
function getInitials(fullName) {
  var names = fullName.split(" ");
  if (names.length >= 2) {
    return names[0][0].toUpperCase() + names[1][0].toUpperCase();
  } else if (names[0].length > 0) {
    return names[0][0].toUpperCase();
  }
}

// ~ set form to update
function setFormForUpdate(id) {
  updateBtn.classList.replace("d-none", "d-block");
  addBtn.classList.replace("d-block", "d-none");
  contactToBeUpdated = allContacts.find(function (contact) {
    return contact.id == id;
  });
  contactNameInput.value = contactToBeUpdated.fullName;
  contactPhoneNumberInput.value = contactToBeUpdated.phoneNumber;
  contactEmailInput.value = contactToBeUpdated.emailAdress;
  contactAddressInput.value = contactToBeUpdated.address;
  contactGroupInput.value = contactToBeUpdated.group;
  NotesInput.value = contactToBeUpdated.note;
  favoriteContactInput.checked = contactToBeUpdated.favorite;
  emergencyContactInput.checked = contactToBeUpdated.emergency;
  if (contactToBeUpdated.image) {
    imageLivePrev.innerHTML = `
      <div class=" rounded-circle d-flex align-items-center justify-content-center h-100 overflow-hidden">
        <img
          src="${contactToBeUpdated.image}"
          alt=""
          class="position-absolute w-100 h-100 top-0 start-0 bottom-0 end-0 rounded-24px object-fit-cover"
        />
      </div>
    `;
  } else {
    imageLivePrev.innerHTML = `
        <div class="default-image rounded-circle d-flex align-items-center justify-content-center h-100 over-flow-hidden">
    <span class="text-white fs-2">${contactToBeUpdated.fullName[0].toUpperCase()}</span>
  </div>
    `;
  }
}

// ~ Delete Contact
function DeleteContact(id) {
  var contact = allContacts.find(function (contact) {
    return contact.id == id;
  });
  swal({
    title: "Delete Contact?",
    text: `Are you sure you want to delete ${contact.fullName} ? This action cannot be undone.`,
    icon: "warning",
    buttons: ["Cancel", "Yes, delete it!"],
    dangerMode: true,
  }).then(function (willDelete) {
    if (willDelete) {
      allContacts = allContacts.filter(function (contact) {
        return contact.id != id;
      });
      saveIntoLocalStorage();
      displayContacts();

      swal({
        title: "Deleted",
        text: "Contact deleted successfully",
        icon: "success",
        timer: 1000,
        buttons: false,
      });
    }
  });
}

// ~ Update Contact
function updateContact() {
  if (validateForm()) {
    contactToBeUpdated.fullName = contactNameInput.value;
    contactToBeUpdated.phoneNumber = contactPhoneNumberInput.value;
    contactToBeUpdated.emailAdress = contactEmailInput.value;
    contactToBeUpdated.address = contactAddressInput.value;
    contactToBeUpdated.group = contactGroupInput.value;
    contactToBeUpdated.note = NotesInput.value;
    contactToBeUpdated.favorite = favoriteContactInput.checked;
    contactToBeUpdated.emergency = emergencyContactInput.checked;
    if (imageInput.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(imageInput.files[0]);
      reader.onload = function () {
        contactToBeUpdated.image = reader.result;
        displayContacts();
        saveIntoLocalStorage();
      };
    } else {
      displayContacts();
      saveIntoLocalStorage();
    }

    clearFrom();
  } else {
    swal("Error", "Please fix the errors in the form before saving.", "error");
  }
}

// ~ Name Validation
function nameValidation() {
  var pattern = /^[a-zA-Z\u0600-\u06FF\s]{2,50}$/;
  var term = contactNameInput.value;

  if (pattern.test(term)) {
    console.log("term is valid");
    contactNameInput.classList.remove("is-invalid");
    errName.classList.add("d-none");
    return true;
  } else {
    errName.classList.remove("d-none");
    console.log("term is not valid");
    contactNameInput.classList.add("is-invalid");
    return false;
  }
}

// ~ Phone Number Validation
function phoneNumberValidation() {
  var pattern = /^(\+20|0020|20)?0?1[0125][0-9]{8}$/;
  var term = contactPhoneNumberInput.value;

  if (pattern.test(term)) {
    contactPhoneNumberInput.classList.remove("is-invalid");
    errPhonenumber.classList.add("d-none");
    return true;
  } else {
    contactPhoneNumberInput.classList.add("is-invalid");
    errPhonenumber.classList.remove("d-none");
    return false;
  }
}

// ~ Email Validation
function emailValidation() {
  var pattern = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
  var term = contactEmailInput.value;
  if (term === "" || pattern.test(term)) {
    contactEmailInput.classList.remove("is-invalid");
    errEmail.classList.add("d-none");
    return true;
  } else {
    contactEmailInput.classList.add("is-invalid");
    errEmail.classList.remove("d-none");
    return false;
  }
}

// ~ Form Validation
function validateForm() {
  var isNameValid = nameValidation();
  var isPhoneValid = phoneNumberValidation();
  var isEmailValid = emailValidation();

  return isNameValid && isPhoneValid && isEmailValid;
}

// ~ check Duplicate
function checkDuplicateNumber() {
  for (var i = 0; i < allContacts.length; i++) {
    if (allContacts[i].phoneNumber === contactPhoneNumberInput.value) {
      return true;
    }
  }
  return false;
}
