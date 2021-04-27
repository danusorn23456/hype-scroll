import React from 'react';
import ScrollArea from './components/scrollArea';

function App() {

  return (
    <>
      <ScrollArea className="!h-screen flex flex-col bg-[#F1F9FB]">
        <div className="container mx-auto">
          <header className="py-16">
            <h1 className="text-6xl font-medium text-center">AUTO HIDE SCROLL BAR</h1>
          </header>
          <div className="flex py-8 space-x-8">
            <h1>Y</h1>
            <ScrollArea scrollY className={`!w-1/3 !h-96 bg-white border p-10 mx-auto relative`}>
              <p className="">
                Excepteur laborum adipisicing nostrud aliqua ea laborum non eiusmod id pariatur. Est nulla pariatur cupidatat laboris ipsum laboris irure deserunt. Labore minim dolore sint in anim veniam excepteur elit pariatur mollit proident do exercitation. Proident ipsum consectetur aliqua mollit voluptate quis ipsum voluptate nostrud pariatur exercitation pariatur. Eiusmod occaecat pariatur velit fugiat deserunt culpa magna dolore incididunt ut.
                Deserunt incididunt ad cupidatat dolor laborum excepteur elit quis tempor dolor aliquip qui. Reprehenderit culpa irure minim do officia nisi occaecat tempor. Id ex quis commodo non eiusmod adipisicing exercitation non velit reprehenderit non nulla. Commodo esse reprehenderit do sint dolore tempor amet. Id aliqua consequat duis anim culpa aliqua.
                Velit do cillum consectetur laborum enim et reprehenderit ad officia occaecat esse officia et deserunt. Et eu deserunt est duis proident aliqua fugiat laborum proident reprehenderit. Occaecat fugiat eiusmod mollit nostrud. Fugiat do consequat reprehenderit ipsum veniam amet minim nisi.
                Minim sunt elit ullamco dolor aliqua irure qui qui minim mollit ea duis ex. Amet consectetur quis sint amet veniam consectetur excepteur exercitation dolore eu. Commodo reprehenderit ipsum ex eiusmod cillum. Est adipisicing irure enim sit incididunt nostrud qui magna. Qui esse in et velit quis.
                Eu esse Lorem Lorem nulla minim eiusmod. Reprehenderit nostrud nostrud Lorem consectetur ad. Incididunt cupidatat cillum elit sunt Lorem consectetur et Lorem fugiat deserunt. Est magna elit est reprehenderit. Ad veniam dolore culpa adipisicing exercitation sit.
                Anim aliqua id consectetur consequat anim anim anim ut aliquip sit ad nostrud ex officia. Pariatur non laborum sit est ipsum. Nulla elit ipsum minim esse incididunt consectetur qui laborum labore voluptate ullamco id aute nulla. Ullamco amet dolor aliquip sunt non laborum.
                Culpa exercitation tempor fugiat minim tempor veniam exercitation dolor do nisi. Reprehenderit adipisicing et sunt amet aliquip do esse cupidatat laborum minim id amet sunt enim. Do cillum ut sunt sunt sint ex cupidatat. Eu id dolor laboris amet.
                Incididunt magna minim dolor quis excepteur consequat et reprehenderit consectetur. Labore dolor duis sit aute mollit nostrud dolore elit aliqua. In do dolore et nostrud proident labore nisi cupidatat. Quis ut incididunt ullamco in in. Veniam in minim tempor ex excepteur laborum id ipsum aliqua. Irure tempor proident tempor ullamco ex officia ullamco do.
                Nulla eu sint aute et incididunt veniam. In laboris mollit duis pariatur ex occaecat est officia. Mollit id officia nulla anim cupidatat elit occaecat in reprehenderit qui incididunt est. Ea mollit commodo laborum aliquip.
                Commodo nostrud aute eu exercitation ipsum adipisicing irure ullamco. Elit eu labore enim deserunt ullamco elit aute. Ex culpa do excepteur cillum aliqua et ut ipsum anim ullamco minim cillum deserunt. Ut minim quis ipsum excepteur est irure aliquip nostrud aliqua ut sunt. Ipsum fugiat aute adipisicing sunt officia magna excepteur mollit.
              </p>
            </ScrollArea>
            <h1>X</h1>
            <ScrollArea scrollX scrollY={false} className={`!w-1/3 !h-96 border bg-white p-10 mx-auto`}>
              <p className="w-[200%]">
                Excepteur laborum adipisicing nostrud aliqua ea laborum non eiusmod id pariatur. Est nulla pariatur cupidatat laboris ipsum laboris irure deserunt. Labore minim dolore sint in anim veniam excepteur elit pariatur mollit proident do exercitation. Proident ipsum consectetur aliqua mollit voluptate quis ipsum voluptate nostrud pariatur exercitation pariatur. Eiusmod occaecat pariatur velit fugiat deserunt culpa magna dolore incididunt ut.
                Deserunt incididunt ad cupidatat dolor laborum excepteur elit quis tempor dolor aliquip qui. Reprehenderit culpa irure minim do officia nisi occaecat tempor. Id ex quis commodo non eiusmod adipisicing exercitation non velit reprehenderit non nulla. Commodo esse reprehenderit do sint dolore tempor amet. Id aliqua consequat duis anim culpa aliqua.
                Velit do cillum consectetur laborum enim et reprehenderit ad officia occaecat esse officia et deserunt. Et eu deserunt est duis proident aliqua fugiat laborum proident reprehenderit. Occaecat fugiat eiusmod mollit nostrud. Fugiat do consequat reprehenderit ipsum veniam amet minim nisi.
                Minim sunt elit ullamco dolor aliqua irure qui qui minim mollit ea duis ex. Amet consectetur quis sint amet veniam consectetur excepteur exercitation dolore eu. Commodo reprehenderit ipsum ex eiusmod cillum. Est adipisicing irure enim sit incididunt nostrud qui magna. Qui esse in et velit quis.
                Eu esse Lorem Lorem nulla minim eiusmod. Reprehenderit nostrud nostrud Lorem consectetur ad. Incididunt cupidatat cillum elit sunt Lorem consectetur et Lorem fugiat deserunt. Est magna elit est reprehenderit. Ad veniam dolore culpa adipisicing exercitation sit.
                Anim aliqua id consectetur consequat anim anim anim ut aliquip sit ad nostrud ex officia. Pariatur non laborum sit est ipsum. Nulla elit ipsum minim esse incididunt consectetur qui laborum labore voluptate ullamco id aute nulla. Ullamco amet dolor aliquip sunt non laborum.
                Culpa exercitation tempor fugiat minim tempor veniam exercitation dolor do nisi. Reprehenderit adipisicing et sunt amet aliquip do esse cupidatat laborum minim id amet sunt enim. Do cillum ut sunt sunt sint ex cupidatat. Eu id dolor laboris amet.
                Incididunt magna minim dolor quis excepteur consequat et reprehenderit consectetur. Labore dolor duis sit aute mollit nostrud dolore elit aliqua. In do dolore et nostrud proident labore nisi cupidatat. Quis ut incididunt ullamco in in. Veniam in minim tempor ex excepteur laborum id ipsum aliqua. Irure tempor proident tempor ullamco ex officia ullamco do.
                Nulla eu sint aute et incididunt veniam. In laboris mollit duis pariatur ex occaecat est officia. Mollit id officia nulla anim cupidatat elit occaecat in reprehenderit qui incididunt est. Ea mollit commodo laborum aliquip.
                Commodo nostrud aute eu exercitation ipsum adipisicing irure ullamco. Elit eu labore enim deserunt ullamco elit aute. Ex culpa do excepteur cillum aliqua et ut ipsum anim ullamco minim cillum deserunt. Ut minim quis ipsum excepteur est irure aliquip nostrud aliqua ut sunt. Ipsum fugiat aute adipisicing sunt officia magna excepteur mollit.
              </p>
            </ScrollArea>
            <h1>XY</h1>
            <ScrollArea scrollX scrollY className={`!w-1/3 !h-96 border bg-white p-10 mx-auto relative`}>
              <p className="w-[120%]">
                Excepteur laborum adipisicing nostrud aliqua ea laborum non eiusmod id pariatur. Est nulla pariatur cupidatat laboris ipsum laboris irure deserunt. Labore minim dolore sint in anim veniam excepteur elit pariatur mollit proident do exercitation. Proident ipsum consectetur aliqua mollit voluptate quis ipsum voluptate nostrud pariatur exercitation pariatur. Eiusmod occaecat pariatur velit fugiat deserunt culpa magna dolore incididunt ut.
                Deserunt incididunt ad cupidatat dolor laborum excepteur elit quis tempor dolor aliquip qui. Reprehenderit culpa irure minim do officia nisi occaecat tempor. Id ex quis commodo non eiusmod adipisicing exercitation non velit reprehenderit non nulla. Commodo esse reprehenderit do sint dolore tempor amet. Id aliqua consequat duis anim culpa aliqua.
                Velit do cillum consectetur laborum enim et reprehenderit ad officia occaecat esse officia et deserunt. Et eu deserunt est duis proident aliqua fugiat laborum proident reprehenderit. Occaecat fugiat eiusmod mollit nostrud. Fugiat do consequat reprehenderit ipsum veniam amet minim nisi.
                Minim sunt elit ullamco dolor aliqua irure qui qui minim mollit ea duis ex. Amet consectetur quis sint amet veniam consectetur excepteur exercitation dolore eu. Commodo reprehenderit ipsum ex eiusmod cillum. Est adipisicing irure enim sit incididunt nostrud qui magna. Qui esse in et velit quis.
                Eu esse Lorem Lorem nulla minim eiusmod. Reprehenderit nostrud nostrud Lorem consectetur ad. Incididunt cupidatat cillum elit sunt Lorem consectetur et Lorem fugiat deserunt. Est magna elit est reprehenderit. Ad veniam dolore culpa adipisicing exercitation sit.
                Anim aliqua id consectetur consequat anim anim anim ut aliquip sit ad nostrud ex officia. Pariatur non laborum sit est ipsum. Nulla elit ipsum minim esse incididunt consectetur qui laborum labore voluptate ullamco id aute nulla. Ullamco amet dolor aliquip sunt non laborum.
                Culpa exercitation tempor fugiat minim tempor veniam exercitation dolor do nisi. Reprehenderit adipisicing et sunt amet aliquip do esse cupidatat laborum minim id amet sunt enim. Do cillum ut sunt sunt sint ex cupidatat. Eu id dolor laboris amet.
                Incididunt magna minim dolor quis excepteur consequat et reprehenderit consectetur. Labore dolor duis sit aute mollit nostrud dolore elit aliqua. In do dolore et nostrud proident labore nisi cupidatat. Quis ut incididunt ullamco in in. Veniam in minim tempor ex excepteur laborum id ipsum aliqua. Irure tempor proident tempor ullamco ex officia ullamco do.
                Nulla eu sint aute et incididunt veniam. In laboris mollit duis pariatur ex occaecat est officia. Mollit id officia nulla anim cupidatat elit occaecat in reprehenderit qui incididunt est. Ea mollit commodo laborum aliquip.
                Commodo nostrud aute eu exercitation ipsum adipisicing irure ullamco. Elit eu labore enim deserunt ullamco elit aute. Ex culpa do excepteur cillum aliqua et ut ipsum anim ullamco minim cillum deserunt. Ut minim quis ipsum excepteur est irure aliquip nostrud aliqua ut sunt. Ipsum fugiat aute adipisicing sunt officia magna excepteur mollit.
              </p>
            </ScrollArea>
            
          </div>
        </div>
      </ScrollArea>
    </>

  );
}

export default App;
