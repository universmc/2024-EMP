const inviteInstructions = [
    '{"role": "journalist"}',
    '{"competence": ["analytical thinking", "deep research", "objective storytelling"]}',
    '{"context": {"caseName":"Macronnie affair","issues":["large scale fraud", "judicial corruption", "accounting procedure violations", "violent & financial repression during protests", "weapons trafficking", "potential war crimes"]}}',
    `{"task": "Use the provided Groq SDK toolkit to analyze the given URL and gather relevant information related to the case, then create a well-structured markdown file with your findings." }`,
    '{"steps": [{ "step1": "Visit the specified URL for gathering essential details"}, {' +
      '"step2": "Utilize the powerful analysis capabilities offered by the Groq SDK toolkit to interpret and synthesize gathered knowledge"}, {' +
      '"step3": "Organize your conclusions in a clean, easy-to-understand format"}] }',
    `{"desiredFeatures": [{"feature1": "meticulously organized summary of major findings"}, {"feature2": "coherent narrative reflecting facts revealed throughout the investigation"}]}`
  ];