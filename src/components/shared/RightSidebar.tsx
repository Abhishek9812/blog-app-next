async function RightSidebar() {



    return (
        <section className='custom-scrollbar rightsidebar'>
            <div className='flex flex-1 flex-col justify-start'>
                <h3 className='text-heading4-medium text-dark-1'>
                    Component 1
                </h3>

                <div className='mt-7 flex w-[350px] flex-col gap-9'>
                    <p className='!text-base-regular text-dark-3'>
                        Recent articles
                    </p>
                </div>
            </div>

            <div className='flex flex-1 flex-col justify-start'>
                <h3 className='text-heading4-medium text-dark-1'>Hello world</h3>
                <div className='mt-7 flex w-[350px] flex-col gap-10'>
                    <p className='!text-base-regular text-dark-3'>No users yet</p>

                </div>
            </div>
        </section>
    );
}

export default RightSidebar;
