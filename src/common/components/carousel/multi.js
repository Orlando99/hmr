{
  step: int,
    steps;
:
  Array < Object >,
}

// Step object
{
  title: String,
    subStepIndex;
:
  Integer,
    subSteps;
:
  Array < Object >,
    isComplete;
:
  Boolean,
}

// step 1
{
  artwork: Object < >
}


// step 2 -- subSteps 1
{
  title: String,
    cardText;
:
  String,
    previewCard;
:
  {
    section: "text", size;
  :
    "small";
  }
,
  isRequired: Boolean,
    validationRequirement;
:
  cardText; // !null || ""
}

// step 2 -- subSteps 2
{
  title: String,
    isRequired;
:
  Boolean,
    personalImageUrl;
:
  String,
    previewCard;
:
  {
    section: "personalImage", size;
  :
    "small";
  }
,
}

// step 2 -- subSteps 3
{
  title: String,
    backgroundColor;
:
  String, // default #FFFFFF,
    isRequired;
:
  Boolean,
    previewCard;
:
  {
    section: "background", size;
  :
    "large";
  }
}

// step 3 -- substep 1
{
  title: String,
    isRequired;
:
  Boolean,
    mailingInfo;
:
  Object,
    previewCard;
:
  {
    section: "senderAddress", size;
  :
    "small";
  }
}

// step 3 -- substep 2
{
  title: String,
    isRequired;
:
  Boolean,
    userId;
:
  String, // opitional || add to local storage
    previewCard;
:
  {
    section: String, size;
  :
    null;
  }
,
  imageInstructions: String,
}

// step 3 -- substep 3
{
  title: String,
    isRequired;
:
  Boolean,
    checkboxes;
:
  [{title: String, value: Boolean}],
    recipients;
:
  [{
    "name": "Sludge2 McGrudge",
    "addressStreet": "222 Test St",
    "city": "New York",
    "state": "NY",
    "zip": "10018"
  } ...];
  amount: Number,
    totalPrice;
:
  Number,
    previewCard;
:
  {
    section: "recipientAddress", size;
  :
    "small";
  }

}

// step 4 -- substep 1 summary
{
  submitted: Boolean;
}

// Payload to Send
{
  "userId";
:
  "5b7b69f3ac503441680230cc", // optional
    "stripeToken";
:
  "tok_mastercard", // required in step 4
    "isPublic";
:
  true, // step 4
    "template";
:
  {
    "id";
  :
    "1", // hardcoded to one because we only have one template
      "details";
  :
    {
      "cardText";
    :
      "Stripetest here",
        "backgroundColor";
    :
      "#ffffff",
        "personalImageUrl";
    :
      "https://placehold.it/600x600", // substep 2
        "artwork";
    :
      { // hardcode -- this is step one
        "url";
      :
        "https://placehold.it/1200x800",
          "description";
      :
        "Cool This is an important description for us here",
          "credit";
      :
        "Bilbo Baggins 2019";
      }
    }
  }
,
  "mailingInfo";
:
  {
    "sender";
  :
    {
      "name";
    :
      "2Bill Testy McTest",
        "addressStreet";
    :
      "530 7th Avenue",
        "city";
    :
      "New York",
        "state";
    :
      "NY",
        "zip";
    :
      "10018";
    }
  ,
    "recipients";
  :
    [{
      "name": "Sludge2 McGrudge",
      "addressStreet": "222 Test St",
      "city": "New York",
      "state": "NY",
      "zip": "10018"
    }];
  }
}
