import _courses from "./courses.json" with {type: "json"};

/**
 * @typedef {Object} Course
 * @property {string} course
 * @property {string} title
 * @property {number?} units
 * @property {TopicalBreadth} topical
 * @property {CoreLiteracies} literacies
 * @property {string} description
 * @property {string} prerequisite
 * @property {string} course_cross_listing
 * @property {string} most_recent_term_offered
 */

/**
 * @typedef {Object} TopicalBreadth
 * @property {boolean} ah
 * @property {boolean} se
 * @property {boolean} ss
 */

/**
 * @typedef {Object} CoreLiteracies
 * @property {boolean} acgh
 * @property {boolean} dd
 * @property {boolean} ol
 * @property {boolean} ql
 * @property {boolean} sl
 * @property {boolean} vl
 * @property {boolean} wc
 * @property {boolean} we
*/

/** @type {Course[]} */
const courses = _courses;

/** @type {(topical: TopicalBreadth) => string} */
const topical_template = (topical) => {
    const topical_descs = {
        ah: "<abbr title='Arts & Humanties'>AH</abbr>",
        se: "<abbr title='Science & Engineering'>SE</abbr>",
        ss: "<abbr title='Social Sciences'>SS</abbr>"
    };
    return Object.entries(topical).filter(v => v[1]).map(v => topical_descs[v[0]]).join(", ");
};

/** @type {(topical: CoreLiteracies) => string} */
const literacies_template = (topical) => {
    const literacy_descs = {
        agch: "<abbr title='American Cultures, Governance, & History'>AGCH</abbr>",
        dd: "<abbr title='Domestic Diversity'>DD</abbr>",
        ol: "<abbr title='Oral Literacy'>OL</abbr>",
        ql: "<abbr title='Quantitative Literacy'>QL</abbr>",
        sl: "<abbr title='Scientific Literacy'>SL</abbr>",
        vl: "<abbr title='Visual Literacy'>VL</abbr>",
        wc: "<abbr title='World Cultures'>WC</abbr>",
        we: "<abbr title='Writing Experience'>WE</abbr>",
    };
    return Object.entries(topical).filter(v => v[1]).map(v => literacy_descs[v[0]]).join(", ");
};

/** @type {HTMLFormElement} */
const form = document.getElementById("filter");

/** @type {HTMLInputElement} */
const filter = form.elements["filter_text"];

/** @type {(ev: Event) => void} */
const handler = (ev) => {
    try {
        /** @type {(course: Course) => bool} */
        const filter_fn = !!filter.value ? new Function("$", `return !!(${filter.value});`) : _ => true;
        const filtered_courses = courses.filter(filter_fn).map(course_info => `
            <article>
                <h2>${course_info.course}: ${course_info.title}</h2>
                <b>Units:</b> ${course_info.units ?? "Variable units"}<br/>
                <b>Topical Breadth:</b> ${topical_template(course_info.topical)}<br/>
                <b>Core Literacies:</b> ${literacies_template(course_info.literacies)}<br/>
                <b>Description:</b> ${course_info.description}<br/>
                <b>Prerequisites:</b> ${course_info.prerequisite}<br/>
                <b>Course Cross Listing:</b> ${course_info.course_cross_listing}<br/>
                <b>Most Recent Term Offered:</b> ${course_info.most_recent_term_offered}<br/>
            </article>
        `);
        document.getElementById("all_courses").innerHTML = filtered_courses.join("\n");
    } catch (err) {

    }
};

handler();

filter.addEventListener("change", handler);