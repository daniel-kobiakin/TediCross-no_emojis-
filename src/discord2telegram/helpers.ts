import R from "ramda";

/********************
 * Make the helpers *
 ********************/

/**
 * Ignores errors arising from trying to delete an already deleted message. Rethrows other errors
 *
 * @param err The error to check
 *
 * @throws The error, if it is another type
 */
export const ignoreAlreadyDeletedError = R.ifElse(R.propEq("message", "Unknown Message"), R.always(undefined), err => {
	throw err;
});

/**
 * Converts characters '&', '<' and '>' in strings into HTML safe strings
 *
 * @param text The text to escape the characters in
 *
 * @returns The escaped string
 */
export const escapeHTMLSpecialChars = R.compose(
	R.replace(/>/g, "&gt;"),
	R.replace(/</g, "&lt;"),
	R.replace(/&/g, "&amp;")
);

/**
 * Filters custom emojis from the output
 *
 * @param input The string that needs to be filtered
 *
 * @returns Filtered string
 */
export function customEmojiFilter(input: string){
	const regex = /\&lt;[^;]*&gt;\s{1,2}/gi;
	return input.split(regex).join('');
}

export function replaceAtWithHash(input: string){
	const updatedInput = input.split(' ').map(el => el[0] !== '@' ? el : el.replace('@', '#')).join(' ');
	return updatedInput
}
