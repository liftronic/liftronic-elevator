import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogPostClient from "./BlogPostClient";

// Blog post type definition
type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  tag: string;
  date: string;
  readTime: string;
  author: string;
  imageSrc?: string;
  imageAlt?: string;
  relatedPosts?: string[];
};

// Sample blog post data - this would typically come from a CMS or database
const blogPosts: Record<string, BlogPost> = {
  "modernization-elevators-age-gracefully": {
    id: "modernization-elevators-age-gracefully",
    title: "Modernization: Elevators That Age Gracefully",
    excerpt:
      "From controllers to door upgrades — how to extend lifespan and improve ride quality without full replacement.",
    content: `
# Introduction

Elevator modernization is a strategic approach to extending the life of your existing elevator system while improving performance, safety, and energy efficiency. Rather than completely replacing an elevator, modernization focuses on upgrading key components to meet current standards and user expectations.

## Why Modernize Instead of Replace?

### Cost Effectiveness
Modernization typically costs 40-60% less than a complete replacement while delivering comparable performance improvements. This makes it an attractive option for building owners looking to optimize their investment.

### Minimal Disruption
Unlike full replacement, modernization can often be completed with minimal building disruption. Many upgrades can be performed during off-hours or with phased approaches that maintain elevator service.

### Regulatory Compliance
Older elevators may not meet current safety codes and accessibility requirements. Modernization ensures compliance with contemporary standards while preserving the existing infrastructure.

## Key Components for Modernization

### Controller Systems
Modern microprocessor-based controllers offer significant advantages over relay-based systems:

- **Improved ride quality** with precise floor leveling and smooth acceleration
- **Enhanced diagnostics** for predictive maintenance
- **Energy efficiency** through optimized motor control
- **Integration capabilities** with building management systems

### Door Systems
Door modernization can dramatically improve user experience:

- **Faster operation** with modern door operators
- **Improved safety** with advanced door sensors
- **Better accessibility** with extended door open times
- **Reduced maintenance** with modern components

### Motor and Drive Systems
Upgrading to modern traction systems provides:

- **Energy savings** of up to 40% through regenerative drives
- **Quieter operation** with gearless motors
- **Smoother rides** with variable frequency drives
- **Reduced maintenance** requirements

### Safety Systems
Contemporary safety features include:

- **Emergency communication** systems
- **Fire service operation** compliance
- **Seismic safety** upgrades where applicable
- **Modern safety circuits** and monitoring

## Planning Your Modernization

### Assessment Phase
A thorough evaluation of existing systems helps determine:

- Component condition and remaining life
- Code compliance gaps
- Performance improvement opportunities
- Budget and timeline constraints

### Phased Approach
Consider a phased modernization strategy:

1. **Phase 1**: Critical safety and code compliance updates
2. **Phase 2**: Performance and efficiency improvements
3. **Phase 3**: Aesthetic and comfort enhancements

### Integration Considerations
Modern elevators can integrate with:

- Building access control systems
- Energy management platforms
- Predictive maintenance systems
- Mobile applications for enhanced user experience

## Expected Outcomes

### Performance Improvements
- 25-50% reduction in wait times
- Improved ride comfort and smoothness
- Enhanced reliability and uptime
- Better energy efficiency

### Lifecycle Extension
A well-planned modernization can extend elevator life by:
- 15-20 years for major component upgrades
- 10-15 years for control system updates
- 5-10 years for targeted improvements

### Return on Investment
Typical ROI factors include:
- Energy cost savings
- Reduced maintenance expenses
- Improved building value
- Enhanced tenant satisfaction

## Conclusion

Elevator modernization represents a strategic investment in building infrastructure that balances cost, performance, and disruption. By focusing on key components and planning carefully, building owners can achieve significant improvements while preserving their existing investment.

The key to successful modernization lies in proper assessment, strategic planning, and working with experienced professionals who understand both the technical requirements and the operational needs of your building.
    `,
    tag: "Modernization",
    date: "Aug 12, 2025",
    readTime: "5 min read",
    author: "Liftronic Engineering Team",
    imageSrc: "/assets/service_banner.png",
    imageAlt: "Elevator modernization process",
    relatedPosts: [
      "safety-checklist-residential-buildings",
      "predictive-maintenance-basics",
    ],
  },
  "safety-checklist-residential-buildings": {
    id: "safety-checklist-residential-buildings",
    title: "Safety Checklist: Residential Buildings",
    excerpt:
      "A comprehensive checklist facility managers can use monthly to keep passengers safe and downtime low.",
    content: `
# Monthly Elevator Safety Checklist for Residential Buildings

Regular safety inspections are crucial for maintaining elevator safety and reliability in residential buildings. This comprehensive checklist helps facility managers identify potential issues before they become serious problems.

## Visual Inspection

### Elevator Car Interior
- [ ] Check lighting functionality (all bulbs working)
- [ ] Inspect handrails for stability and cleanliness
- [ ] Verify emergency communication system operation
- [ ] Test emergency lighting and alarm systems
- [ ] Check floor indicators and button responsiveness
- [ ] Inspect car floor for damage or wear
- [ ] Verify proper ventilation operation

### Doors and Safety Systems
- [ ] Test door opening and closing operation
- [ ] Check door edge protection systems
- [ ] Verify proper door alignment and seal
- [ ] Test emergency door operation procedures
- [ ] Inspect door tracks for obstructions
- [ ] Check photo-eye sensors functionality
- [ ] Verify door force settings comply with safety standards

## Mechanical Components

### Motor Room Inspection
- [ ] Check motor temperature and vibration levels
- [ ] Inspect electrical connections for signs of wear
- [ ] Verify proper lubrication of moving parts
- [ ] Check brake operation and adjustment
- [ ] Inspect control panels for error codes
- [ ] Test emergency stop functions
- [ ] Verify backup power system operation

### Hoistway and Pit
- [ ] Inspect cables for fraying or damage
- [ ] Check guide rails for proper alignment
- [ ] Verify pit cleanliness and drainage
- [ ] Test pit lights and emergency stop switches
- [ ] Inspect buffers and safety devices
- [ ] Check for any unusual noises during operation
- [ ] Verify proper clearances and safety zones

## Performance Testing

### Ride Quality Assessment
- [ ] Test smooth acceleration and deceleration
- [ ] Verify accurate floor leveling
- [ ] Check for unusual vibrations or noises
- [ ] Test car speed and timing between floors
- [ ] Verify proper operation at all floor levels
- [ ] Check load capacity indicators
- [ ] Test emergency evacuation procedures

### System Response Tests
- [ ] Fire service recall operation
- [ ] Emergency power transfer
- [ ] Overload protection systems
- [ ] Security system integration
- [ ] Backup communication systems
- [ ] Automatic rescue device (if equipped)

## Documentation and Records

### Maintenance Logs
- [ ] Review recent service reports
- [ ] Check compliance with manufacturer schedules
- [ ] Verify all required certifications are current
- [ ] Document any issues or repairs needed
- [ ] Update resident communication as needed
- [ ] Schedule professional inspections as required

### Compliance Verification
- [ ] Annual inspection certificates current
- [ ] Insurance requirements met
- [ ] Local code compliance verified
- [ ] Accessibility standards maintained
- [ ] Emergency protocol updates distributed

## Warning Signs to Address Immediately

### Critical Safety Issues
- Unusual noises during operation
- Jerky or rough ride quality
- Doors not closing properly
- Emergency systems not responding
- Unusual burning smells
- Visible cable or mechanical damage
- Control system error messages

### When to Call Professionals
Contact your elevator service provider immediately if you notice:
- Any safety system malfunction
- Significant changes in ride quality
- Mechanical noises or vibrations
- Electrical issues or error codes
- Emergency system failures

## Preventive Measures

### Regular Maintenance
- Schedule quarterly professional inspections
- Maintain lubrication schedules
- Replace worn components proactively
- Keep detailed maintenance records
- Train building staff on basic troubleshooting

### Resident Education
- Post emergency procedures clearly
- Educate residents on proper elevator use
- Establish reporting procedures for issues
- Maintain emergency contact information
- Regular safety reminders and updates

## Conclusion

A proactive approach to elevator safety through regular inspections and maintenance not only ensures resident safety but also extends equipment life and reduces costly emergency repairs. This checklist should be used in conjunction with professional maintenance services and regular inspections by certified technicians.

Remember that while this checklist covers many important safety aspects, it does not replace the need for professional elevator inspections and maintenance by qualified technicians. Always consult with certified elevator professionals for complex issues or when in doubt about any safety concerns.
    `,
    tag: "Safety",
    date: "Jul 28, 2025",
    readTime: "8 min read",
    author: "Safety Engineering Team",
    imageSrc: "/illustrations/lift01.png",
    imageAlt: "Elevator safety inspection",
    relatedPosts: [
      "modernization-elevators-age-gracefully",
      "predictive-maintenance-basics",
    ],
  },
  "mrl-vs-conventional-systems": {
    id: "mrl-vs-conventional-systems",
    title: "Machine-Room-Less (MRL) vs. Conventional",
    excerpt:
      "Space, efficiency, and maintenance factors when choosing between MRL and conventional elevator systems.",
    content: `
# MRL vs. Conventional Elevator Systems: A Comprehensive Comparison

When planning a new elevator installation, one of the most important decisions is choosing between Machine-Room-Less (MRL) and conventional elevator systems. This guide examines the key differences, advantages, and considerations for each option.

## Understanding the Systems

### Conventional Elevator Systems
Traditional elevator systems require a separate machine room, typically located above the hoistway. This room houses:
- Traction motor and drive system
- Control panels and electrical equipment
- Governor and safety systems
- Maintenance and access equipment

### Machine-Room-Less (MRL) Systems
MRL elevators integrate the machinery directly into the hoistway, eliminating the need for a separate machine room. Key components are housed:
- In the overhead space of the hoistway
- Along the sides of the hoistway
- In specially designed compact enclosures

## Space Considerations

### Building Design Impact

**Conventional Systems:**
- Require dedicated machine room (typically 8-15 sq meters)
- Machine room must be directly above or adjacent to hoistway
- Additional structural requirements for machine room
- Separate ventilation and electrical requirements

**MRL Systems:**
- No machine room required
- Reduced building height requirements
- More flexible building design options
- Additional usable space for other purposes

### Cost Implications
The space savings with MRL systems can translate to:
- 10-20% reduction in building costs for high-rise buildings
- More efficient use of premium real estate space
- Reduced structural and architectural requirements
- Lower overall construction complexity

## Performance Comparison

### Speed and Capacity
Both systems can achieve similar performance levels:

**Speed Ranges:**
- Conventional: Up to 4+ m/s for high-rise applications
- MRL: Typically up to 2.5 m/s, sufficient for most applications

**Load Capacity:**
- Conventional: Virtually unlimited capacity options
- MRL: Generally up to 1600 kg, suitable for most residential and commercial needs

### Ride Quality
Modern systems of both types offer excellent ride quality:
- Advanced vibration isolation
- Precise speed control
- Smooth acceleration and deceleration
- Accurate floor leveling

## Energy Efficiency

### Power Consumption
Both systems can incorporate energy-efficient technologies:

**Common Efficiency Features:**
- Regenerative drives
- LED lighting systems
- Standby mode operation
- Variable frequency drives

**MRL Advantages:**
- Shorter traveling cables reduce electrical losses
- Compact design often includes latest efficiency technologies
- Better integration with building energy management systems

### Environmental Impact
- Reduced material usage in MRL systems
- Lower carbon footprint from reduced building requirements
- Energy recovery capabilities in both systems
- Environmentally friendly refrigerants and lubricants

## Installation and Construction

### Installation Timeline
**Conventional Systems:**
- Machine room construction adds to timeline
- Requires coordination of multiple building trades
- Machine room access during construction phase

**MRL Systems:**
- Faster installation process
- Reduced coordination requirements
- Earlier building completion possible

### Structural Requirements
**Load Distribution:**
- Conventional: Loads transferred to machine room structure
- MRL: Loads distributed to hoistway structure
- Both require proper structural engineering

**Building Integration:**
- MRL systems require careful hoistway design
- Conventional systems offer more flexibility in hoistway layout
- Both require proper electrical and ventilation planning

## Maintenance Considerations

### Access and Serviceability
**Conventional Systems:**
- Easy access to all major components in machine room
- Comfortable working environment for technicians
- Separate ventilation and lighting for maintenance

**MRL Systems:**
- All maintenance performed within hoistway
- May require specialized access equipment
- Advanced remote diagnostics often standard

### Maintenance Costs
- MRL systems often have lower maintenance costs due to newer technology
- Conventional systems have longer track record and more service options
- Both require regular professional maintenance

### Component Replacement
**Conventional:**
- Large components can be replaced more easily
- Standard industry practices and equipment
- Multiple service provider options

**MRL:**
- Compact design may require specialized replacement procedures
- Advanced diagnostics reduce troubleshooting time
- Growing network of qualified service providers

## Technology and Future-Proofing

### Control Systems
Both systems can incorporate:
- Smart building integration
- Predictive maintenance systems
- Remote monitoring capabilities
- Advanced user interfaces

### Upgrade Potential
**Conventional Systems:**
- Easier to upgrade major components
- More space for additional equipment
- Established upgrade procedures

**MRL Systems:**
- Latest technology often standard
- Integrated smart features
- Future upgrades may require system-level changes

## Decision Factors

### Choose Conventional Systems When:
- Very high speed or capacity requirements
- Existing building with suitable machine room space
- Maximum flexibility for future modifications needed
- Multiple elevator banks requiring shared machine rooms

### Choose MRL Systems When:
- Space optimization is critical
- Building height restrictions exist
- Energy efficiency is a priority
- Moderate speed and capacity requirements
- New construction with flexible design options

## Cost Analysis

### Initial Investment
- MRL systems often have higher equipment costs
- Conventional systems require machine room construction costs
- Total project costs often favor MRL for new construction
- Retrofit situations may favor conventional systems

### Lifecycle Costs
Consider factors including:
- Energy consumption over system lifetime
- Maintenance and service costs
- Component replacement expenses
- Building space value over time

## Conclusion

The choice between MRL and conventional elevator systems depends on specific project requirements, building constraints, and long-term objectives. MRL systems offer significant advantages in space efficiency and modern technology integration, while conventional systems provide proven reliability and maintenance practices.

For most new construction projects under 20 floors, MRL systems offer compelling advantages. However, each project should be evaluated individually, considering factors such as building design, usage patterns, budget constraints, and long-term maintenance capabilities.

Consulting with experienced elevator professionals and considering the total cost of ownership over the system's lifecycle will help ensure the best choice for your specific application.
    `,
    tag: "Guides",
    date: "Jul 10, 2025",
    readTime: "6 min read",
    author: "Technical Advisory Team",
    imageSrc: "/illustrations/lift02.png",
    imageAlt: "MRL elevator system comparison",
    relatedPosts: [
      "modernization-elevators-age-gracefully",
      "energy-efficiency-modern-elevators",
    ],
  },
  "predictive-maintenance-basics": {
    id: "predictive-maintenance-basics",
    title: "Predictive Maintenance Basics",
    excerpt:
      "Sensors, runtime logs, and when to schedule service — the fundamentals of predictive upkeep.",
    content: `
# Predictive Maintenance: The Future of Elevator Care

Predictive maintenance represents a paradigm shift from reactive and scheduled maintenance to a data-driven approach that predicts when maintenance is actually needed. This comprehensive guide explores how modern technology is revolutionizing elevator maintenance.

## Understanding Predictive Maintenance

### Traditional Maintenance Approaches

**Reactive Maintenance:**
- Fix issues after they occur
- Leads to unexpected downtime
- Higher emergency repair costs
- Potential safety risks

**Scheduled Maintenance:**
- Fixed intervals regardless of actual condition
- May involve unnecessary work
- Doesn't prevent unexpected failures
- Standard industry practice for decades

**Predictive Maintenance:**
- Data-driven maintenance decisions
- Maintenance only when needed
- Prevents failures before they occur
- Optimizes maintenance costs and timing

## Key Technologies and Sensors

### Vibration Monitoring
Modern accelerometers and vibration sensors detect:
- Motor bearing wear
- Misalignment issues
- Mechanical imbalances
- Guide rail problems

**Implementation:**
- Sensors mounted on motor, gearbox, and car frame
- Continuous monitoring with wireless data transmission
- AI algorithms analyze vibration patterns
- Early warning alerts for developing issues

### Temperature Monitoring
Thermal sensors track:
- Motor operating temperatures
- Electrical connection heat buildup
- Brake system thermal conditions
- Environmental conditions in machine room

**Benefits:**
- Prevent overheating damage
- Identify electrical issues early
- Optimize cooling system operation
- Extend component lifecycle

### Current and Power Analysis
Electrical monitoring systems measure:
- Motor current consumption patterns
- Power quality and electrical efficiency
- Load variations and operating cycles
- Electrical component health

**Applications:**
- Detect motor efficiency degradation
- Identify electrical system issues
- Optimize energy consumption
- Predict electrical component failures

### Door System Monitoring
Specialized sensors track:
- Door opening/closing cycles
- Force measurements during operation
- Timing variations and performance
- Safety system activation frequency

**Maintenance Insights:**
- Door operator wear patterns
- Safety sensor degradation
- Mechanical adjustment needs
- Performance optimization opportunities

## Data Collection and Analysis

### IoT Integration
Modern elevator systems incorporate:
- Edge computing devices in elevator controllers
- Cloud-based data storage and analysis
- Real-time monitoring dashboards
- Mobile access for technicians and managers

### Machine Learning Applications
AI algorithms analyze data to:
- Identify normal operating patterns
- Detect anomalies and deviations
- Predict component failure timelines
- Recommend optimal maintenance actions

### Key Performance Indicators (KPIs)
Important metrics include:
- Overall Equipment Effectiveness (OEE)
- Mean Time Between Failures (MTBF)
- Mean Time To Repair (MTTR)
- Energy efficiency trends
- Passenger wait times and satisfaction

## Implementation Strategy

### Assessment Phase
**Current State Analysis:**
- Evaluate existing elevator systems
- Assess data collection capabilities
- Review current maintenance practices
- Identify improvement opportunities

**Technology Requirements:**
- Sensor installation planning
- Communication infrastructure needs
- Data storage and analysis platforms
- Integration with existing building systems

### Pilot Program
Start with a limited implementation:
- Select representative elevator systems
- Install essential monitoring equipment
- Establish baseline performance data
- Train maintenance staff on new procedures

### Gradual Expansion
- Extend to additional elevator systems
- Add more sophisticated sensors
- Integrate with building management systems
- Develop custom analytics and reporting

## Benefits and ROI

### Operational Benefits
**Reduced Downtime:**
- 30-50% reduction in unplanned outages
- Faster diagnosis and repair times
- Improved service reliability
- Better passenger experience

**Cost Savings:**
- 20-25% reduction in maintenance costs
- Optimized parts inventory management
- Extended component lifecycles
- Reduced emergency service calls

**Safety Improvements:**
- Early detection of safety system issues
- Proactive replacement of worn components
- Improved compliance with safety regulations
- Enhanced passenger confidence

### Financial Returns
Typical ROI factors:
- Reduced maintenance labor costs
- Lower emergency repair expenses
- Extended equipment lifecycles
- Improved building value and tenant satisfaction
- Energy efficiency improvements

## Challenges and Considerations

### Initial Investment
- Sensor installation costs
- Data infrastructure requirements
- Software licensing and setup
- Staff training and development

### Technical Challenges
- Integration with older elevator systems
- Data quality and reliability concerns
- Cybersecurity considerations
- Maintenance staff adaptation

### Organizational Changes
- Shift from scheduled to condition-based maintenance
- New skills requirements for technicians
- Updated maintenance procedures and workflows
- Performance measurement and reporting changes

## Best Practices for Implementation

### Technology Selection
- Choose compatible sensors and systems
- Ensure scalability for future expansion
- Prioritize cybersecurity features
- Select proven, reliable technologies

### Staff Development
- Train technicians on new diagnostic tools
- Develop data analysis capabilities
- Create new maintenance procedures
- Establish performance monitoring protocols

### Continuous Improvement
- Regular review of predictive accuracy
- Refinement of maintenance thresholds
- Integration of new sensor technologies
- Expansion of predictive capabilities

## Future Developments

### Emerging Technologies
- Advanced AI and machine learning algorithms
- Enhanced sensor miniaturization
- Improved wireless communication protocols
- Integration with smart building platforms

### Industry Trends
- Standardization of predictive maintenance protocols
- Development of industry-specific analytics
- Integration with manufacturer support systems
- Expansion to other building systems

## Conclusion

Predictive maintenance represents the future of elevator care, offering significant benefits in terms of cost reduction, improved reliability, and enhanced safety. While implementation requires initial investment and organizational changes, the long-term benefits far outweigh the costs.

Success with predictive maintenance requires a strategic approach that includes careful technology selection, comprehensive staff training, and continuous improvement processes. As the technology continues to evolve, early adopters will gain competitive advantages in building operations and tenant satisfaction.

The key to successful predictive maintenance implementation lies in starting with a clear strategy, selecting appropriate technologies, and maintaining focus on continuous improvement and staff development.
    `,
    tag: "Maintenance",
    date: "Jun 22, 2025",
    readTime: "7 min read",
    author: "Service Operations Team",
    imageSrc: "/illustrations/product01.png",
    imageAlt: "Predictive maintenance sensors",
    relatedPosts: [
      "safety-checklist-residential-buildings",
      "modernization-elevators-age-gracefully",
    ],
  },
};

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts[slug];

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `/blogs/${slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts[slug];

  if (!post) {
    notFound();
  }

  return <BlogPostClient post={post} allPosts={blogPosts} />;
}

// Generate static paths for all blog posts
export async function generateStaticParams() {
  return Object.keys(blogPosts).map((slug) => ({
    slug,
  }));
}
