export const links = [
  {
    name: "Home",
    hash: "#home",
  },
  {
    name: "Demo",
    hash: "#demo",
  },
  {
    name: "Pricing",
    hash: "#pricing",
  },
  {
    name: "FAQ",
    hash: "#faq",
  },
  {
    name: "Contact",
    hash: "#contact",
  },
] as const;

export const faq = [
  {
    question: "How can I generate clothing images for my clothing brands?",
    answer:
      "Polara lets you upload flat-lay photos of your items and then generate AI photos of models wearing the clothes by simply describing them.",
  },
  {
    question:
      "What type of photos should I upload to generate my clothing images?",
    answer:
      "Photos of the clothes laid flat or on mannequin work the best. You can also use images of the item already worn by someone, but you should crop the image around the item to help the AI focus on it.",
  },
  {
    question: "Will Polara maintain patterns and prints of my items?",
    answer:
      "Prints and patterns are hard to keep consistent accross all generations. Depending on the complexity of the clothing, you may have to generate multiple photos before getting a satsifying one.",
  },
  {
    question: "Can I use Polara to try-on clothes on myself?",
    answer:
      "Not at the moment! The tool has been tought for brands as an alternative to photoshoots.",
  },
  {
    question: "Will the AI photos have defects?",
    answer:
      "Sometimes yes. There will always be a probablity to generate aberrations such as an extra arm, deformed eyes, etc. Currently, about 80% of photos you generate will be good enough and we are consistenly working to improve these odds.",
  },
  {
    question: "How much does Polara cost?",
    answer:
      "Our prices start at $0.5 USD per photo generated. You can buy credits as you need them or subscribe to a plan for monthly credits. The higher the subscription, the lower the cost per credits. Subscriptions help us better forecast compute costs to run our AI models and thus offer the most competitive prices possible.",
  },
  {
    question: "Can I get a refund if I am not satisfied with the output?",
    answer:
      "Unfortunately, we cannot offer refunds as costs incurred runnning AI models is extremely high (compared to traditional software). When a photo is generated, we pay for the processing time used by the GPU, regardless of the photo quality and cannot ask for a refund ourselves. During sign up you agree to withhold your right to refund for this reason.",
  },
  ,
] as const;
