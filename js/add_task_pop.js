/**function to open the add task popup on contacts */
async function openAddTask() {
  /*createTaskAddToContact();*/
  await loadTasks();
  await loadContacts();
  getLocalCurrentUser();
  await renderContactsToAssigned();
  addPrio(0);
  datepicker();
  document.getElementById("addTaskPopup").classList.add("outside");
  document.getElementById("close").classList.remove("d-none");
  let bg = document.getElementById("contAddTaskToContact");
  bg.classList.remove("d-none");
  setTimeout(easein, 500);
  /*selectedContactNames.push()*/
}

/**function to ease the popup in by changing classnames */
function easein() {
  let task_popup = document.getElementById("addTaskPopup");
  task_popup.classList.remove("outside");
  task_popup.classList.add("inside");
}

/**function to undisplay the creator */
function closeTaskCreator() {
  let task_popup = document.getElementById("addTaskPopup");
  let bg = document.getElementById("contAddTaskToContact");
  bg.classList.add("d-none");
}

/**function to render the possible contacts you can choose the assign from */
async function renderContactsToAssigned() {
  for (let i = 0; i < allContacts.length; i++) {
    const contact = allContacts[i]["name"];
    document.getElementById("openedContacts").innerHTML += `
      <div class="oneContact" onclick="addContact(${i})">
        <div id="contact${i}">${contact}</div>
        <div class="contactButton" id="contactButton${i}"></div>
      </div>
      `;
  }
}

/**function to render the html of the add task popup */
/*function createTaskAddToContact() {
  let popup_task = document.getElementById("contAddTaskToContact");
    popup_task.innerHTML = `
    <form onsubmit="createTask(),closeTaskCreator();return false;">
        <div id="addTaskPopup" class="outside">
          <div id="close" onclick="closeTaskCreator()">X</div>
          <div class="addTaskLeft">
            <h1>Add Task</h1>
            <div class="column title">
              <span>Title</span>
              <input
                required
                placeholder="Enter a title"
                type="text"
                onkeyup="addTitle()"
                id="titleInput"
              />
            </div>

            <!-- DESCRIPTION -->
            <div class="column description">
              <span>Description</span>
              <textarea
                required
                placeholder="Enter a Description"
                type="text"
                onkeyup="addDescription()"
                id="descriptionTextarea"
              ></textarea>
            </div>

            <!-- CATEGORY -->
            <div class="column category">
              <span>Category</span>
              <div
                class="selectField"
                id="selectField"
                onclick="openCloseCategories()"
              >
                <div class="selectCategory" id="selectCategory">
                  <div class="center">
                    <div id="categoryColor"></div>
                    <input
                      maxlength="16"
                      id="category"
                      required
                      style="color: #dcdcdc"
                      placeholder="Select task category"
                    />
                  </div>
                  <div id="categoryImage">
                    <img src="assets/img/arrow_drop.svg" />
                  </div>
                </div>

                <div
                  class="d-none"
                  id="openedCategories"
                  onclick="notOpenCloseCategories(event)"
                >
                  <div class="oneCategory" onclick="addNewCategory()">
                    New category
                  </div>
                  <div class="oneCategory" onclick="addCategory(0)">
                    <div class="center">
                      <div id="imageCat0" class="imageCat">
                        <img src="assets/img/circle_pink.svg" />
                      </div>
                      <div id="category0">Marketing</div>
                    </div>
                  </div>
                  <div class="oneCategory" onclick="addCategory(1)">
                    <div class="center">
                      <div id="imageCat1" class="imageCat">
                        <img src="assets/img/circle_turquoise.svg" />
                      </div>
                      <div id="category1">Backoffice</div>
                    </div>
                  </div>
                  <div class="oneCategory" onclick="addCategory(2)">
                    <div class="center">
                      <div id="imageCat2" class="imageCat">
                        <img src="assets/img/circle_darkblue.svg" />
                      </div>
                      <div id="category2">Sales</div>
                    </div>
                  </div>
                  <div class="oneCategory" onclick="addCategory(3)">
                    <div class="center">
                      <div id="imageCat3" class="imageCat">
                        <img src="assets/img/circle_orange.svg" />
                      </div>
                      <div id="category3">Engineering</div>
                    </div>
                  </div>
                  <div class="oneCategory" onclick="addCategory(4)">
                    <div class="center">
                      <div id="imageCat4" class="imageCat">
                        <img src="assets/img/circle_green.svg" />
                      </div>
                      <div id="category4">Manufacturing</div>
                    </div>
                  </div>
                  <div class="oneCategory" onclick="addCategory(5)">
                    <div class="center">
                      <div id="imageCat5" class="imageCat">
                        <img src="assets/img/circle_red.svg" />
                      </div>
                      <div id="category5">Customer service</div>
                    </div>
                  </div>
                  <div class="oneCategory" onclick="addCategory(6)">
                    <div class="center">
                      <div id="imageCat6" class="imageCat">
                        <img src="assets/img/circle_blue.svg" />
                      </div>
                      <div id="category6">IT</div>
                    </div>
                  </div>
                </div>
              </div>

              <div id="categoryColors" class="d-none">
                <div onclick="changeColor(0)" id="changeColor1" class="color">
                  <img src="assets/img/circle_pink.svg" />
                </div>
                <div onclick="changeColor(1)" id="changeColor0" class="color">
                  <img src="assets/img/circle_turquoise.svg" />
                </div>
                <div onclick="changeColor(2)" id="changeColor2" class="color">
                  <img src="assets/img/circle_darkblue.svg" />
                </div>
                <div onclick="changeColor(3)" id="changeColor3" class="color">
                  <img src="assets/img/circle_orange.svg" />
                </div>
                <div onclick="changeColor(4)" id="changeColor4" class="color">
                  <img src="assets/img/circle_green.svg" />
                </div>
                <div onclick="changeColor(5)" id="changeColor5" class="color">
                  <img src="assets/img/circle_red.svg" />
                </div>
                <div onclick="changeColor(6)" id="changeColor6" class="color">
                  <img src="assets/img/circle_blue.svg" />
                </div>
              </div>
            </div>

            <!-- ASSIGNED TO-->
            <div class="column contacts">
              <span>Assigned to</span>
              <div
                class="selectField"
                id="selectFieldContact"
                onclick="openCloseContacts()"
              >
                <div class="selectContact" id="selectContact">
                  <input
                    id="contact"
                    required
                    placeholder="Select contacts to assign"
                  />
                  <div id="contactImage">
                    <img class="paddingRight" src="assets/img/arrow_drop.svg" />
                  </div>
                </div>
                <div
                  class="d-none"
                  id="openedContacts"
                  onclick="notOpenCloseContacts(event)"
                ></div>
              </div>
              <div id="addedContacts"></div>
            </div>
          </div>
          <img src="assets/img/line_vertical.svg" class="imageLine" />

          <div class="addTaskRight">
            <div class="column">
              <span>Due date</span>
              <input
                type="text"
                required
                placeholder="dd/mm/yyyy"
                id="datepicker"
                
                style="
                  background: url('assets/img/calendar.svg') no-repeat 95%;
                  background-color: white;
                "
              />
            </div>

            <div class="column">
              <span>Prio</span>
              <div class="prioButtons">
                <div
                  onclick="addPrio(0)"
                  id="prioButton0"
                  style="background-color: white"
                >
                  Urgent
                  <img id="prioImage0" src="assets/img/urgent_newTask.svg" />
                </div>
                <div
                  onclick="addPrio(1)"
                  id="prioButton1"
                  style="background-color: white"
                >
                  Medium
                  <img id="prioImage1" src="assets/img/medium_newTask.svg" />
                </div>
                <div
                  onclick="addPrio(2)"
                  id="prioButton2"
                  style="background-color: white"
                >
                  Low <img id="prioImage2" src="assets/img/low_newTask.svg" />
                </div>
              </div>
            </div>

            <div class="column subtask">
              <span>Subtasks</span>
              <div class="selectField">
                <div class="selectContact">
                  <input
                    maxlength="16"
                    type="text"
                    placeholder="Add new subtask"
                    id="newSubtaskInput"
                  />
                  <div>
                    <img
                      class="paddingRight"
                      src="assets/img/subtask_plus.svg"
                      onclick="addNewSubtask()"
                    />
                  </div>
                </div>
              </div>
              <div id="newSubtasks"></div>
            </div>

            <div class="ccButtons">
              <div onclick="clearTask()">
                Clear<img src="assets/img/button_cross.svg" />
              </div>
              <button>Create Task<img src="assets/img/button_ok.svg" /></button>
            </div>
          </div>
        </div>
      </form>
      `;
}*/
