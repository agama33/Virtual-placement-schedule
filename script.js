const placement = {
  startDate: '2026-09-07',
  weeks: {
    1: [
      {
        isoDate: '2026-09-07', dayName: 'Monday', shortDay: 'Mon', dateNumber: '7', label: 'Day 1',
        notice: {
          level: 'information',
          title: 'Welcome to your first day',
          message: 'Please join Welcome and Orientation by 09:15. Have Microsoft Teams open and your introduction document ready.',
          points: ['Check that Teams is working', 'Lunch is scheduled for 12:30', 'Use the session panels below for resources and joining details']
        },
        sessions: [
          { id:'wellbeing-am', start:'09:00', end:'09:15', title:'Morning Wellbeing Check-in', type:'wellbeing', speaker:'Placement Team', location:'Microsoft Teams', description:'A short welcome and wellbeing check-in to help everyone settle into the day.', preparation:'Join a few minutes early and have your camera available if you are comfortable using it.', outcomes:['Connect with your learner group','Understand the plan for the day'] },
          { id:'welcome', start:'09:15', end:'10:00', title:'Welcome and Orientation', type:'orientation', speaker:'Jo Williams', administrator:'Maya Lewis', location:'Microsoft Teams', description:'Welcome and learner orientation. Meet the team, understand how the placement works and get ready for the fortnight ahead.', preparation:'Have Teams open and your learner workbook ready.', outcomes:['Understand the structure of the placement','Know where to find support','Meet your learner group'], resources:[{ name:'Introduction document', file:'Introduction (test).docx', type:'Word document', action:'Download' }] },
          { id:'break-am', start:'10:00', end:'10:15', title:'Break', type:'break', description:'Take a short screen break before the next session.' },
          { id:'family-consultation', start:'10:15', end:'11:30', title:'Family Consultation Activity', type:'activity', speaker:'Facilitated activity', location:'Interactive web activity', description:'Explore a virtual consultation and identify factors affecting health and wellbeing.', preparation:'No preparation required.', outcomes:['Gather relevant information','Recognise wider determinants of health','Discuss findings with your group'] },
          { id:'independent-learning', start:'11:30', end:'12:30', title:'Independent Learning', type:'independent', speaker:'Self-directed', location:'Learner workbook', description:'Use this time to review your notes, complete the first workbook task and prepare questions for the afternoon.', preparation:'Open your learner workbook.', outcomes:['Consolidate morning learning','Identify questions for discussion'] },
          { id:'lunch-1', start:'12:30', end:'13:30', title:'Lunch', type:'break', description:'Lunch break.' },
          { id:'primary-care-intro', start:'13:30', end:'15:00', title:'Introduction to Primary Care', type:'live', speaker:'Guest speaker', location:'Microsoft Teams', description:'An introduction to primary care, the wider system and the role of multidisciplinary teams.', preparation:'Bring one question about working in primary care.', outcomes:['Describe the role of primary care','Recognise key members of the multidisciplinary team'] },
          { id:'wellbeing-pm', start:'15:00', end:'15:15', title:'Afternoon Wellbeing Check-in', type:'wellbeing', speaker:'Placement Team', location:'Microsoft Teams', description:'A short pause to reconnect and check how the day is going.', preparation:'No preparation required.', outcomes:['Reflect on your energy and learning needs'] },
          { id:'reflection-1', start:'15:15', end:'16:30', title:'Daily Reflection and Group Discussion', type:'reflection', speaker:'Jo Williams', location:'Microsoft Teams', description:'Capture your key learning, compare observations with your group and note questions to revisit.', preparation:'Bring your learner workbook and notes from the day.', outcomes:['Identify key learning','Record follow-up questions','Share insights with peers'] },
          { id:'close-1', start:'16:30', end:'17:00', title:'Day One Close', type:'orientation', speaker:'Placement Team', location:'Microsoft Teams', description:'Review tomorrow’s plan and raise any final questions before the day ends.', preparation:'Check the timetable for Tuesday.', outcomes:['Know what to prepare for Day 2'] }
        ]
      },
      { isoDate:'2026-09-08', dayName:'Tuesday', shortDay:'Tue', dateNumber:'8', label:'Day 2', notice:{ level:'information', title:'Tuesday schedule', message:'The detailed schedule for this day will be added from the planning export.', points:[] }, sessions:[] },
      { isoDate:'2026-09-09', dayName:'Wednesday', shortDay:'Wed', dateNumber:'9', label:'Day 3', notice:{ level:'information', title:'Wednesday schedule', message:'The detailed schedule for this day will be added from the planning export.', points:[] }, sessions:[] },
      { isoDate:'2026-09-10', dayName:'Thursday', shortDay:'Thu', dateNumber:'10', label:'Day 4', notice:{ level:'information', title:'Thursday schedule', message:'The detailed schedule for this day will be added from the planning export.', points:[] }, sessions:[] },
      { isoDate:'2026-09-11', dayName:'Friday', shortDay:'Fri', dateNumber:'11', label:'Day 5', notice:{ level:'information', title:'Friday schedule', message:'The detailed schedule for this day will be added from the planning export.', points:[] }, sessions:[] }
    ],
    2: [
      { isoDate:'2026-09-14', dayName:'Monday', shortDay:'Mon', dateNumber:'14', label:'Day 6', notice:{level:'information',title:'Week 2 Monday',message:'The detailed schedule for this day will be added from the planning export.',points:[]}, sessions:[] },
      { isoDate:'2026-09-15', dayName:'Tuesday', shortDay:'Tue', dateNumber:'15', label:'Day 7', notice:{level:'information',title:'Week 2 Tuesday',message:'The detailed schedule for this day will be added from the planning export.',points:[]}, sessions:[] },
      { isoDate:'2026-09-16', dayName:'Wednesday', shortDay:'Wed', dateNumber:'16', label:'Day 8', notice:{level:'information',title:'Week 2 Wednesday',message:'The detailed schedule for this day will be added from the planning export.',points:[]}, sessions:[] },
      { isoDate:'2026-09-17', dayName:'Thursday', shortDay:'Thu', dateNumber:'17', label:'Day 9', notice:{level:'information',title:'Week 2 Thursday',message:'The detailed schedule for this day will be added from the planning export.',points:[]}, sessions:[] },
      { isoDate:'2026-09-18', dayName:'Friday', shortDay:'Fri', dateNumber:'18', label:'Day 10', notice:{level:'information',title:'Final day',message:'The detailed schedule for this day will be added from the planning export.',points:[]}, sessions:[] }
    ]
  }
};

const scheduleEl = document.getElementById('schedule');
const dayTabsEl = document.getElementById('dayTabs');
const todayCardEl = document.getElementById('todayCard');
const selectedDayHeadingEl = document.getElementById('selectedDayHeading');
const weekButtons = [...document.querySelectorAll('[data-week]')];

let currentWeek = 1;
let currentDayIndex = 0;
let manuallyOpenedSession = false;
let openSessionId = null;

function typeLabel(type) {
  return {
    live:'Live session', activity:'Interactive activity', reflection:'Reflection',
    break:'Break', wellbeing:'Wellbeing', orientation:'Orientation', independent:'Independent learning'
  }[type] || type;
}

function toDateTime(isoDate, time) {
  return new Date(`${isoDate}T${time}:00`);
}

function getSessionState(day, session, now = new Date()) {
  const start = toDateTime(day.isoDate, session.start);
  const end = toDateTime(day.isoDate, session.end);
  if (now < start) return 'upcoming';
  if (now >= start && now < end) return 'current';
  return 'past';
}

function findRelevantSession(day, now = new Date()) {
  if (!day.sessions.length) return null;
  const current = day.sessions.find(session => getSessionState(day, session, now) === 'current');
  if (current) return current;
  const next = day.sessions.find(session => getSessionState(day, session, now) === 'upcoming');
  return next || null;
}

function renderDayTabs() {
  const days = placement.weeks[currentWeek];
  dayTabsEl.innerHTML = days.map((day, index) => `
    <button class="day-tab ${index === currentDayIndex ? 'active' : ''}" data-day-index="${index}" role="tab" aria-selected="${index === currentDayIndex}">
      <span>${day.shortDay}</span><strong>${day.dateNumber}</strong>
    </button>
  `).join('');

  dayTabsEl.querySelectorAll('.day-tab').forEach(button => {
    button.addEventListener('click', () => {
      currentDayIndex = Number(button.dataset.dayIndex);
      manuallyOpenedSession = false;
      openSessionId = null;
      render();
    });
  });
}

function renderNotice(day) {
  const notice = day.notice;
  const points = notice.points?.length
    ? `<ul>${notice.points.map(point => `<li>${point}</li>`).join('')}</ul>`
    : '';
  todayCardEl.className = `today-card ${notice.level || 'information'}`;
  todayCardEl.innerHTML = `
    <div class="notice-icon" aria-hidden="true">i</div>
    <div class="notice-content">
      <p class="eyebrow">Today</p>
      <h3>${notice.title}</h3>
      <p>${notice.message}</p>
      ${points}
    </div>
  `;
}

function renderResources(resources = []) {
  if (!resources.length) return '';
  return `
    <section class="resource-section">
      <div class="resource-heading">
        <div><p class="eyebrow">Downloads</p><h4>Session resources</h4></div>
        <span class="resource-total">${resources.length}</span>
      </div>
      <div class="resource-list">
        ${resources.map(resource => `
          <a class="resource-item" href="${encodeURI(resource.file)}" download>
            <span class="file-icon">${resource.type.includes('PowerPoint') ? 'PPT' : 'DOC'}</span>
            <span class="resource-details"><strong>${resource.name}</strong><small>${resource.type}</small></span>
            <span class="resource-action">${resource.action || 'Download'}</span>
          </a>
        `).join('')}
      </div>
    </section>
  `;
}

function renderSessionDetails(session) {
  const outcomes = session.outcomes?.length
    ? `<section class="detail-section"><h4>Learning outcomes</h4><ul>${session.outcomes.map(outcome => `<li>${outcome}</li>`).join('')}</ul></section>`
    : '';
  const joiningButton = session.location === 'Microsoft Teams'
    ? `<button class="join-button" type="button" disabled title="Add the live Teams link before launch">Join session</button>`
    : '';
  return `
    <div class="accordion-details-inner">
      ${session.description ? `<section class="detail-section"><h4>About this session</h4><p>${session.description}</p></section>` : ''}
      <div class="detail-grid">
        ${session.speaker ? `<div><span>Led by</span><strong>${session.speaker}</strong></div>` : ''}
        ${session.administrator ? `<div><span>Administrator</span><strong>${session.administrator}</strong></div>` : ''}
        ${session.location ? `<div><span>Location</span><strong>${session.location}</strong></div>` : ''}
      </div>
      ${session.preparation ? `<section class="detail-section preparation"><h4>Before the session</h4><p>${session.preparation}</p></section>` : ''}
      ${outcomes}
      ${renderResources(session.resources)}
      ${joiningButton}
    </div>
  `;
}

function stateLabel(state) {
  return state === 'current' ? 'Now' : state === 'past' ? 'Completed' : 'Upcoming';
}

function renderSchedule() {
  const day = placement.weeks[currentWeek][currentDayIndex];
  const now = new Date();
  const relevant = findRelevantSession(day, now);

  if (!manuallyOpenedSession && !openSessionId && relevant) openSessionId = relevant.id;
  if (!manuallyOpenedSession && !openSessionId && day.sessions.length) openSessionId = day.sessions[0].id;

  selectedDayHeadingEl.innerHTML = `
    <div><p class="eyebrow">${day.label}</p><h3>${day.dayName} ${day.dateNumber} September</h3></div>
    <span>${day.sessions.length ? `${day.sessions.length} schedule items` : 'Schedule coming soon'}</span>
  `;

  if (!day.sessions.length) {
    scheduleEl.innerHTML = `<div class="empty-state"><div class="empty-icon">◷</div><h3>Schedule coming soon</h3><p>This day will be populated from the placement planning export.</p></div>`;
    return;
  }

  scheduleEl.innerHTML = `<div class="timeline">${day.sessions.map(session => {
    const state = getSessionState(day, session, now);
    const isOpen = openSessionId === session.id;
    const resourceCount = session.resources?.length || 0;
    return `
      <article class="session-card ${state} ${isOpen ? 'open' : ''}" data-type="${session.type}" data-session-id="${session.id}">
        <button class="accordion-trigger" aria-expanded="${isOpen}" aria-controls="details-${session.id}">
          <span class="time-block"><strong>${session.start}</strong><span>${session.end}</span></span>
          <span class="accent"></span>
          <span class="session-info">
            <span class="session-title-row"><strong>${session.title}</strong>${resourceCount ? `<span class="resource-count">📎 ${resourceCount}</span>` : ''}</span>
            <span class="session-subtitle">${session.speaker || session.description || typeLabel(session.type)}</span>
            <span class="session-meta"><span class="badge ${session.type}">${typeLabel(session.type)}</span><span class="state-badge ${state}">${stateLabel(state)}</span></span>
          </span>
          <span class="chevron" aria-hidden="true">⌄</span>
        </button>
        <div class="accordion-details" id="details-${session.id}" ${isOpen ? '' : 'hidden'}>${renderSessionDetails(session)}</div>
      </article>
    `;
  }).join('')}</div>`;

  scheduleEl.querySelectorAll('.accordion-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const card = trigger.closest('.session-card');
      const id = card.dataset.sessionId;
      openSessionId = openSessionId === id ? null : id;
      manuallyOpenedSession = true;
      renderSchedule();
    });
  });
}

function render() {
  weekButtons.forEach(button => {
    const active = Number(button.dataset.week) === currentWeek;
    button.classList.toggle('active', active);
    button.setAttribute('aria-selected', String(active));
  });
  renderDayTabs();
  const day = placement.weeks[currentWeek][currentDayIndex];
  renderNotice(day);
  renderSchedule();
}

weekButtons.forEach(button => {
  button.addEventListener('click', () => {
    currentWeek = Number(button.dataset.week);
    currentDayIndex = 0;
    manuallyOpenedSession = false;
    openSessionId = null;
    render();
  });
});

document.getElementById('helpButton').addEventListener('click', () => document.getElementById('helpDialog').showModal());
document.getElementById('closeHelp').addEventListener('click', () => document.getElementById('helpDialog').close());

render();
setInterval(() => {
  const day = placement.weeks[currentWeek][currentDayIndex];
  if (day.sessions.length) renderSchedule();
}, 60000);
