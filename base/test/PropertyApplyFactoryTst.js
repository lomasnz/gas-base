

function countTokens(text) {
  // Regular expression to match words, numbers, and punctuation
  var regex = /(\b\w+\b)|(\d+)|(\p{P})/gu;
  var tokens = text.match(regex);
  return tokens ? tokens.length : 0;
}
function splitWords(text) {
  return text.split(/\s+/);
}
function redefinePromt(text) {
  var res = EMPTY;
  var words = splitWords(text);
  for (let i = 0; i < words.length; i++) {
    if (PROMTS[words[i].toLowerCase()]) {
      words[i] = PROMTS[words[i].toLowerCase()].summariesWith;
    }
  }
  res = words.join(" ");
  return res;
}
function doReplace(text) {
  var prompt = redefinePromt(text);
  var previousResult ="summary of blah";
  var newText = "blah, blah";
  var newPrompt = `For the request: ${prompt}\nThe previous response was: ${previousResult}\nNow apply to this text: ${newText}`;
  console.log(newPrompt);
}
function testPrompt() {
  doReplace(`Revise the text in the TEXT section, correcting all spelling and grammar errors. Explain any instances of nonsensical grammar. Use UK English, for instance, spell "organization" as "organisation". Keep in mind that SECTION6 is a company name and should not be altered.`);
  doReplace(`Revise the text to conform to UK English. For example, use "organisation" instead of "organizations" and "colour" instead of "color".`);
  doReplace(`Reformat the Text using markdown conventions: headings (#), ordered lists (1.), unordered lists (-), bold (**), italic (*), underlined (_), strikethrough (~~). Retain original case for headings. Avoid inserting blank lines after headings. Preserve the original content. Remember, "section 6" should be spelled as "SECTION6", but other occurrences of "section" should remain unchanged.`);
  doReplace(`Proofread the text, correcting all spelling and grammar errors. Ensure proper paragraph separation. Where possible without compromising detail, clarify the TEXT section. Use active voice unless it risks losing detail. Explain any instances of nonsensical grammar. Use UK English, for example, "organization" should be "organisation". Note, SECTION6 is a company name and should not be altered.`);
  doReplace(`Revise the text in the TEXT section for clarity without eliminating any detail. Use UK English, for instance, "organization" should be "organisation". Remember, SECTION6 is a company name and should not be altered.`);
  doReplace(`Revise the text to adopt a professional and engaging tone.`);
  doReplace(`Revise the text to adopt a professional, engaging, and persuasive tone.`);
  doReplace(`Revise the text to convey a joyful tone.`);
  doReplace(`Revise the text to resemble a pirate's speech.`);
  doReplace(``);
  doReplace(`Condense this CV into a narrative that encapsulates this person's experience, highlighting industries, key projects, skills, technologies, education, and notable aspects.`);
  doReplace(`From this CV, compile a bulleted list of specific skills in technologies, methodologies, frameworks, and process, along with a list of industries this individual has experience in.`);
  doReplace(`Condense the key points and conclusions of the text into a clear and concise executive summary.`);
  doReplace(`Craft a summary of the text under the heading # Summary.`);
  doReplace(`Create a TL;DR summary of the text.`);
  doReplace(`Summarise the discussed business meeting transcript, including individuals present and absent, main decisions made, actions assigned with ownership and timeline, and any outstanding issues.`);
  doReplace(``);
  doReplace(`Review the TEXT section as a blog post using the following criteria: clarity and coherence, relevance and value, accuracy and reliability, originality and uniqueness, engaging and compelling writing, visual appeal and readability, search engine optimization, call-to-action, length and depth, audience engagement. Identify issues and suggest improvements.`);
  doReplace(`In response to the {question}, review the TEXT section for clarity and efficiency in business communication. Evaluate the text based on these criteria: does it apply the BLUF principle, are key points succinct and clear, does it provide detailed support for key points, is it structured for easy comprehensionContinuing from the previous response:`);
  doReplace(``);
  doReplace(``);
  doReplace(`Evaluate the marketing copy of the text considering the following: clarity, relevance to the target audience, urgency, and specificity of the action requested.`);
  doReplace(``);
  doReplace(`Provide a detailed analysis of {topic}, ensuring accuracy, focus on {specific aspect(s)} within the {time frame}, include relevant background information or context, cite reputable sources or data to back your claims, and consider potential risks, limitations, or biases associated with {topic}.`);
  doReplace(`Brainstorm creative ideas and innovative solutions for {problem}, considering out-of-the-box approaches, focus on {specific aspect(s)}, use {inspiration} as a starting point, speculate, make assumptions, or create hypothetical scenarios, and reflect on the implications, potential benefits, or challenges of the proposed ideas.`);

  doReplace(`From this text, generate step-by-step instructions. Format the TEXT section using markdown elements: headings (#), ordered lists (1.), unordered lists (-), bold (**), italic (*), underlined (_), strikethrough (~~). For example: '1. Get the *cookbook*. 2. Turn to *page 3*. 3. Find the *first recipe*. 4. **Make sure** you have the necessary *ingredients*.'`);
  doReplace(`Rewrite the text using the 'communicating in a crisis' professional format and tone: Express concern, articulate action taken, and provide balanced perspective. Do not omit any detail. Add any relevant detail you are aware of regarding this type of event.`);
  doReplace(`Review the text against the following criteria for crisis communication: transparency, promptness, consistency, preparedness, proactivity, empathy, accessibility, and adaptability. Comment on any gaps or weaknesses in relation to these criteria.`);
}
function testPropertyApplyFactory() {

  PropertyApplyFactory.applyFrom
    (PROP_ACTION_REPLACE_VALUE,
      "1DyF8IeSpnk8DTvH6aM75xEkoochgfUqEh912kWnXlYc",
      "1mxwCN4JD1V3f6UgjgUJylvj70Jkza-dG",
      "customer.account");

}

function testMatch() {
  const errorMsg = "This model\'s maximum context length is 8192 tokens. However, you requested 13576 tokens (5127 in the messages, 8449 in the completion). Please reduce the length of the messages or completion"
  console.log(errorMsg);
  const numbers = errorMsg.match(/\d+/g);
  if (numbers && numbers.length > 0) {
    const maxContentLength = parseInt(numbers[0]);
    const modelsMaximumTokenLengthIncludingInput = parseInt(numbers[1]);
    const inputTokenLength = parseInt(numbers[3]);
    const newMaxToken = maxContentLength - inputTokenLength - 1;
    console.log(maxContentLength, modelsMaximumTokenLengthIncludingInput, inputTokenLength, newMaxToken, maxContentLength - (newMaxToken + inputTokenLength));
  }
  console.log(numbers);
}

function testScript() {
  var s = "https://script.google.com/a/macros/section6.nz/s/AKfycbz5U9UZ_ArAiCAG6oIgtNlUbu-9gY92a7K0jW4ynUw/dev";
  console.log(ScriptApp.getService().getUrl());
}