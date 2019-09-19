// Create Patient Check-in Using POST
$(document).ready(() => {
  $("#submit-form").submit(e => {
    e.preventDefault(e);
    let name = $("#patient-name")
      .val()
      .trim();
    let email = $("#patient-email")
      .val()
      .trim();
    let telephone = $("#patient-mobile")
      .val()
      .trim();
    let age = $("#patient-age")
      .val()
      .trim();
    let sickness = $("#patient-sickness")
      .val()
      .trim();
    let status = $("#patient-status")
      .val()
      .trim();

    if (
      name !== "" &&
      email !== "" &&
      telephone !== "" &&
      age !== "" &&
      sickness !== "" &&
      status !== ""
    ) {
      $.ajax({
        url: "http://localhost:3000/patients",
        method: "post",
        data: {
          name,
          email,
          telephone,
          age,
          sickness,
          status
        }
      }).done(resp => {
        location.reload();
        console.log(resp);
      });
    }
  });
});

//READ ALL PATIENTS
$.ajax({
  url: "http://localhost:3000/patients",
  method: "get"
}).done(resp => {
  // console.log(resp);
  resp.forEach((elem, i) => {
    $("#data-display").append(
      `<tr>
          <td>${i + 1}</td>
          <td>${elem.name}</td>
          <td>${elem.email}</td>
          <td>${elem.telephone}</td>
          <td>${elem.age}</td>
          <td>${elem.sickness}</td>
          <td>${elem.status}</td>
          <td><input type="button" class="btn btn-yellow btn-general" onclick="onePatient(${
            elem.id
          })" value="Edit">&nbsp; <input type="button" class="btn btn-general btn-outline-danger" onclick="deletePatient(${
        elem.id
      })" value="delete"> </td>
      </tr>`
    );
  });
});

//Patient Search
//function searchPatient(i) {
$("#search-form").on("submit", function(e) {
  e.preventDefault(e);
  let pNum = $("#search-number").val();
  let pEmail = $("#search-email").val();
  let patientExist = false;
  $.ajax({
    url: "http://localhost:3000/patients/",
    method: "get"
  }).done(resp => {
    // resp.forEach((elem, i) => {
    //   if (elem.telephone === pNum && elem.email === pEmail) {
    //     patientExist = true;
    //   }
    //   if (patientExist) {
    //     console.log(elem.name, elem.email, i + 1);
    //   } else {
    //     console.log("No such user");
    //   }
    // });
    let name = "";
    let age = "";
    let sickness = "";
    let status = "";
    let id = "";
    for (var i = 0; i < resp.length; i++) {
      if (resp[i].telephone === pNum && resp[i].email === pEmail) {
        patientExist = true;
        name = resp[i].name;
        age = resp[i].age;
        sickness = resp[i].sickness;
        status = resp[i].status;
        id = resp[i].id;
        // console.log(patientExist);
      }
    }
    if (patientExist) {
      $("#data-display").html(`<tr>
          <td>${1}</td>
          <td>${name}</td>
          <td>${pEmail}</td>
          <td>${pNum}</td>
          <td>${age}</td>
          <td>${sickness}</td>
          <td>${status}</td>
          <td><input type="button" class="btn btn-yellow btn-general" onclick="onePatient(${id})" value="Edit">&nbsp; <input type="button" class="btn btn-danger btn-general" onclick="deletePatient(${id})" value="delete"> </td>
      </tr>
          `);
      // alert("Exist");
      // console.log(name, age, pEmail, pNum, status, sickness);
    } else {
      alert("User Does Not Exist");
    }
  });
});
// }

// Read Single Patient
function onePatient(i) {
  $.ajax({
    url: "http://localhost:3000/patients/" + i,
    method: "get"
  }).done(resp => {
    console.log(resp);

    $("#replace").html(
      `
      <div class="container" style="width:50%">
      <h4 class="text-center" style="font-size:24px">Update Patient Info</h4><br>
      <div class="row">
      <div class="col-md-6">
      <input type="text" id="patient-name1" value="${resp.name}" class="form-control" placeholder="Patient Name"><br>
      </div>
      
      <div class="col-md-6">
      <input type="email" id="patient-email1" value="${resp.email}" class="form-control" placeholder="Patient Email"><br>
      </div>
      <div class="col-md-6">
      <input type="tel" id="patient-mobile1" value="${resp.telephone}" class="form-control" placeholder="PhoneNumber"><br>
      </div>
      <div class="col-md-6">
      <input type="number" id="patient-age1" value="${resp.age}" class="form-control" placeholder="Patient Age"><br>
      </div>
      <div class="col-md-6">
      <input type="text" id="patient-sickness1" value="${resp.sickness}" class="form-control" placeholder="Patient Sickness"><br>
      </div>
      <div class="col-md-6">
      <input type="text" id="patient-status1" value="${resp.status}" class="form-control" placeholder="Patient Status"><br>
      </div>
      </div>
      <input type="button" value="update" class="btn btn-yellow btn-general" onclick="upDateInfo(${resp.id})">
      </div>
      `
    );
  });
}

// Update Patient Info
function upDateInfo(i) {
  let name = $("#patient-name1")
    .val()
    .trim();
  let email = $("#patient-email1")
    .val()
    .trim();
  let telephone = $("#patient-mobile1")
    .val()
    .trim();
  let age = $("#patient-age1")
    .val()
    .trim();
  let sickness = $("#patient-sickness1")
    .val()
    .trim();
  let status = $("#patient-status1")
    .val()
    .trim();

  if (
    name !== "" &&
    email !== "" &&
    telephone !== "" &&
    age !== "" &&
    sickness !== "" &&
    status !== ""
  ) {
    $.ajax({
      url: "http://localhost:3000/patients/" + i,
      method: "put",
      data: {
        name,
        email,
        telephone,
        age,
        sickness,
        status
      }
    }).done(resp => {
      location.reload();
      console.log(resp);
    });
  }
}

// Delete Patient
function deletePatient(i) {
  $.ajax({
    url: "http://localhost:3000/patients/" + i,
    method: "delete"
  }).done(resp => {
    console.log("Deleted");
  });
}

// Admin Login Authenticator

$("#login").on("submit", function(e) {
  e.preventDefault(e);
  let username = $("#login-user")
    .val()
    .trim();
  let pword = $("#login-pw")
    .val()
    .trim();
  let userExist = false;
  $.ajax({
    url: "http://localhost:3000/admin",
    method: "get"
  }).done(resp => {
    for (var i = 0; i < resp.length; i++) {
      if (resp[i].username === username && resp[i].password === pword) {
        userExist = true;
        localStorage.setItem("admin", resp[i].id);
      }
    }
    if (userExist) {
      window.location = "database.html";
    } else {
      alert("User Does Not Exist");
    }
  });
});
