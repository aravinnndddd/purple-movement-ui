export const WhyNow = () => {
  return (
    <div className="py-20 px-6" style={{ background: 'linear-gradient(to bottom, #0E001B, #0E001B)' }}>
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <h2 className="text-white text-4xl md:text-5xl font-bold text-center mb-16" style={{ fontFamily: 'Poppins' }}>
          Why Now?
        </h2>
        
        {/* Cards Container */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-items-center mx-auto">
          {/* Card 1 - Real-Time Learning */}
          <div 
            className="backdrop-blur-sm rounded-lg text-center flex items-center justify-center" 
            style={{ 
              backgroundColor: '#00000040',
              width: '285px',
              height: '236.63671875px',
              padding: '20px'
            }}
          >
            <p 
              className="text-white text-center capitalize" 
              style={{ 
                fontFamily: 'Poppins',
                fontWeight: 400,
                fontSize: '18px',
                lineHeight: '140%',
                letterSpacing: '0%'
              }}
            >
              Real-Time Learning From Practitioners—Fast, Relevant, And Future-Ready.
            </p>
          </div>
          
          {/* Card 2 - Community-Powered Access */}
          <div 
            className="backdrop-blur-sm rounded-lg text-center flex items-center justify-center" 
            style={{ 
              backgroundColor: '#00000040',
              width: '285px',
              height: '236.63671875px',
              padding: '20px'
            }}
          >
            <p 
              className="text-white text-center capitalize" 
              style={{ 
                fontFamily: 'Poppins',
                fontWeight: 400,
                fontSize: '18px',
                lineHeight: '140%',
                letterSpacing: '0%'
              }}
            >
              Open, Community-Powered Access To Knowledge Without Paywalls Or Gatekeepers.
            </p>
          </div>
          
          {/* Card 3 - Connecting People */}
          <div 
            className="backdrop-blur-sm rounded-lg text-center flex items-center justify-center" 
            style={{ 
              backgroundColor: '#00000040',
              width: '285px',
              height: '236.63671875px',
              padding: '20px'
            }}
          >
            <p 
              className="text-white text-center capitalize" 
              style={{ 
                fontFamily: 'Poppins',
                fontWeight: 400,
                fontSize: '18px',
                lineHeight: '140%',
                letterSpacing: '0%'
              }}
            >
              Connecting Purposeful People To Co-Create And Grow Through Shared Missions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
