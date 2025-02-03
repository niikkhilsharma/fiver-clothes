export type languageDictionaryType = {
  metadata: {
    title: string;
    description: string;
    keywords: string;
    openGraph: {
      title: string;
      description: string;
      images: { alt: string }[];
    };
    twitter: {
      card: string;
      title: string;
      description: string;
    };
  };
  header: {
    links: {
      name: string;
      hash: string;
      key: string;
    }[];
  };
  hero: {
    title: string;
    description: string;
    try_now: string;
  };
  demo: {
    heading: string;
  };
  pricing: {
    heading: string;
    product_1: {
      "1": string;
      "2": string;
    };
    product_2: {
      "1": string;
      "2": string;
      "3": string;
    };
    product_3: {
      "1": string;
      "2": string;
      "3": string;
    };
  };
  faq: {
    heading: string;
    questions: {
      question: string;
      answer: string;
    }[];
  };
  contact: {
    heading: string;
    subHeading: {
      "1": string;
      "2": string;
      "3": string;
    };
    toastMessages: {
      mailSentSuccess: string;
    };
    placeHolder: {
      input: string;
      textarea: string;
    };
    submitBtn: string;
  };
  footer: {
    allRightReserved: string;
    subHeading: {
      "1": string;
      "2": string;
    };
  };
  create: {
    garmentUploadHeading: string;
    garmentInputHeading: string;
    garmentTypeLabel: string;
    modelUploadHeading: string;
    modelInputHeading: string;
    garmentType: { top: string; bottom: string; fullBody: string };
    generatedImage: string;
    generatedImageInputHeading: string;
    stabilityPromptLabel: string;
    cameraAngleLabel: string;
    cameraAngle: {
      front: string;
      side: string;
      back: string;
      "3/4": string;
    };
    generatingLoader: string;
    btn: string;
    uploadGarmentTypeInput: string;
    downloadBtn: string;
  };
  errors: {
    uploadFailed: string;
    missingInput: string;
    selectGarmentType: string;
    uploadGarmentImage: string;
    pleaseEnterPrompt: string;
    failedGeneration: string;
    statusCheck: string;
    wentWrong: string;
    loginBtn: string;
    reload: string;
  };
  success: {
    title: string;
    imageGenerated: string;
    upload: string;
    uploadDescription: string;
  };
  message: {
    signIn: string;
    loginFirst: string;
    tryAgain: string;
    reload: string;
    credits: string;
  };
  payment: {
    verifying: string;
    failed: {
      title: string;
      message: string;
      returnHome: string;
      paymentVerification: string;
    };
    success: {
      title: string;
      confirmation: string;
      orderDetails: {
        title: string;
        productName: string;
        quantity: string;
        amount: string;
      };
      returnHome: string;
      goToDashboard: string;
    };
  };
};
