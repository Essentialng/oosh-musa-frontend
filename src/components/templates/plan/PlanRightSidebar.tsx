import React from 'react'
import CalenderData from '../../organisms/plan/CalenderData'
import { BsFilter } from 'react-icons/bs'
import { MdCancel, MdDelete } from 'react-icons/md'

const PlanRightSidebar = () => {
  return (
    <div className='text-xs text-start border-l-[1px] border-gray-400 h-full p-2'>
      <CalenderData/>

      {/* filter system */}

      <div className='flex border-b-2 pb-3 border-slate-500 items-center justify-between my-3'>
        <div className='flex items-center justify-center gap-2'>
          <BsFilter/>
          <p>Filter</p>
        </div>

        <div onClick={()=>{alert('handle delete')}} className='flex items-center justify-center gap-1 bg-orange-100 text-orange-600 py-[2px] px-2 rounded-lg cursor-pointer'>
          <p>2</p>
          <MdDelete/>
        </div>
      </div>

      {/* filter list */}
        <div className='flex items-center justify-start gap-5'>
          <div className='flex items-center justify-start bg-green-100 text-green-600 rounded-lg px-2 py-[3px] gap-2'>
            <span>Done</span>
            <MdCancel onClick={()=>{alert('delete filter')}} className='cursor-pointer hover:text-red-500'/>
          </div>

          <div className='flex items-center justify-start bg-purple-100 text-purple-600 rounded-lg px-2 py-[3px] gap-2'>
            <span>Doing</span>
            <MdCancel onClick={()=>{alert('delete filter')}} className='cursor-pointer hover:text-red-500'/>
          </div>
        </div>

        {/* dropdowns */}
        <div className="collapse collapse-plus">
          <input type="radio" name="my-accordion-3" defaultChecked />
          <div className="collapse-title text-sm font-medium">Overdue</div>
          <div className="collapse-content">
            <ul>
              <li className='flex mb-2 items-center justify-between'>
                <input type='checkbox'/>
                <div>
                  <p className='text-md font-bold'>Call boss for ...</p>
                  <p className='text-slate-100'>Aug 12 2024</p>
                </div>
              </li>
              <li className='flex mb-2 items-center justify-between'>
                <input type='checkbox'/>
                <div>
                  <p className='text-md font-bold'>Meet andrew ...</p>
                  <p className='text-slate-100'>Jul 12 2024</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="collapse collapse-plus">
          <input type="radio" name="my-accordion-3" />
          <div className="collapse-title text-sm font-medium">Status</div>
          <div className="collapse-content">
          <ul>
              <li className='flex mb-2 items-center justify-start gap-2'>
                <input type='checkbox'/>
                <div>
                  <p className='text-md'>To do</p>
                </div>
              </li>
              <li className='flex mb-2 items-center justify-start gap-2'>
                <input type='checkbox'/>
                <div>
                  <p className='text-md'>Doing</p>
                </div>
              </li>
              <li className='flex mb-2 items-center justify-start gap-2'>
                <input type='checkbox'/>
                <div>
                  <p className='text-md'>Done</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
    </div>
  )
}

export default PlanRightSidebar