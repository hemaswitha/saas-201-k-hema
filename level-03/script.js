// This is a closure function https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-closure-b2f0d2152b36
(function() {
  var initialize = function() {
    /*
      1. Add all your event bindings here. Please avoid binding events inline and add your event listeners here.

      onSubmit callback
      disableDuplicateSecondaryDepartment callback,...
    */
    var dpt1=document.getElementById("department1");
    var dpt2=document.getElementById("department2");
    var submitButton=document.getElementById("submit");
    submitButton.addEventListener("click",onSubmit);
    dpt1.addEventListener("change",disableDuplicateSecondaryDepartment);
  };

  var disableDuplicateSecondaryDepartment = function(event) {
    // 2. in department2, Should disable the option selected in department1
    var dpt1=document.getElementById("department1");
    var seldept=dpt1.options[dpt1.selectedIndex].value;
    var op = document.getElementById("department2");
    for (var i = 0; i < op.length; i++)
    {
      if (op[i].value == seldept)
     {
        op[i].disabled=true;
     }
     else
     {
      op[i].disabled=false;
     }

    }
  }

  var constructData = function() {

    var text=document.getElementById("name");
    var phno=document.getElementById("number");
    var email=document.getElementById("email");
    var dpt1=document.getElementById("department1");
    var dpt2=document.getElementById("department2");
    var data = {name:text.value,phno:number.value,emailaddress:email.value,department1:dpt1.value,department2:dpt2.value};

    // 3. Construct data from the form here. Please ensure that the keys are the names of input elements

    return data;
  }

  var validateResults = function(data) {
    var isValid = true;

    // 4. Check if the data passes all the validations here
    var emailform=/^([A-Za-z0-9_\-\.])+@college.edu$/;
    if (data["name"].length>100)
    {
      isValid=false;
    }
    else if(data["phno"].length!=10)
    {
      isValid=false;
    }
    else if(!emailform.test(data["emailaddress"]))
    {
      isValid=false;
    }
    else if(data["department1"]==data["department2"])
    {
      isValid=false;
    }

    return isValid;
  };

  var onSubmit = function(event) {
    // 5. Figure out how to avoid the redirection on form submit

    var data = constructData();

    if (validateResults(data)) {
      printResults(data);
    } else {
      var resultsDiv = document.getElementById("results");
      resultsDiv.innerHTML = '';
      resultsDiv.classList.add("hide");
    }
    event.preventDefault();
  };

  var printResults = function(data) {
    var constructElement = function([key, value]) {
      return `<p class='result-item'>${key}: ${value}</p>`;
    };

    var resultHtml = (Object.entries(data) || []).reduce(function(innerHtml, keyValuePair) {
      debugger
      return innerHtml + constructElement(keyValuePair);
    }, '');
    var resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = resultHtml;
    resultsDiv.classList.remove("hide");
  };

  /*
    Initialize the javascript functions only after the html DOM content has loaded.
    This is to ensure that the elements are present in the DOM before binding any event listeners to them.
  */
  document.addEventListener('DOMContentLoaded', initialize);
})();
