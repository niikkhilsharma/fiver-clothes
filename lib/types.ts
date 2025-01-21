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
    modelUploadHeading: string;
    modelInputHeading: string;
    generatedImage: string;
    generatedImageInputHeading: string;
    btn: string;
    uploadGarmentTypeInput: string;
  };
};
