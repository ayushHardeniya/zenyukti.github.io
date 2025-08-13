import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  GraduationCap, 
  HandHelping, 
  Users, 
  ArrowRight,
  Star,
  GitBranch,
  Zap
} from "lucide-react";
import { Github } from "./icons";

const DomainsPreview = () => {
const domains = [
  {
    title: "Members",
    icon: Users,
    description: "Join our growing community of learners and builders. Connect, collaborate, and grow together.",
    members: "600+",
    skills: ["Learning Mindset", "Discussion", "Engagement", "Community Building"],
    color: "neon-green"
  },
  {
    title: "Contributors",
    icon: HandHelping,
    description: "Collaborate on real-world projects, sharpen your skills, and grow your portfolio.",
    members: "10+",
    skills: ["Open Source Contribution", "Problem Solving", "Issue Tracking", "Testing & Debugging"],
    color: "neon-purple"
  },
  {
    title: "Mentors",
    icon: GraduationCap,
    description: "Share your expertise and empower future innovators through meaningful mentorship.",
    members: "...",
    skills: ["Guidance", "Code Review", "Career Mentoring", "Issue Tracking"],
    color: "neon-blue"
  }
  
];

  const contributorFeatures = [
    {
      icon: GitBranch,
      title: "Project Matching",
      description: "Smart algorithm to match contributors with projects based on skills and interests"
    },
    {
      icon: Star,
      title: "Skill Recognition",
      description: "Earn badges and recognition for your contributions to the community"
    },
    {
      icon: Zap,
      title: "Mentorship",
      description: "Connect with experienced mentors and guide newcomers"
    }
  ];

  return (
    <section className="py-20 bg-dark-surface">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-display font-bold text-4xl sm:text-5xl mb-6">
            <span className="text-foreground">Join Our </span>
            <span className="bg-gradient-primary bg-clip-text text-transparent">Domains</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Whether you're a beginner or expert, find your place in our diverse community
          </p>
        </div>

        {/* Domain Cards */}
        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {domains.map((domain, index) => {
            const IconComponent = domain.icon;
            return (
              <Card 
                key={index}
                className="bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-300 group hover:shadow-card"
              >
                <CardHeader className="text-center pb-4">
                  <div className={`w-16 h-16 bg-${domain.color}/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className={`w-8 h-8 text-${domain.color}`} />
                  </div>
                  <CardTitle className="text-2xl font-display">{domain.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground text-center">
                    {domain.description}
                  </p>
                  
                  {/* Stats */}
                  <div className="flex justify-center space-x-6 py-4 border-y border-border">
                    <div className="text-center">
                      <div className={`text-xl font-bold text-${domain.color}`}>
                        {domain.members}
                      </div>
                      <div className="text-xs text-muted-foreground">Members</div>
                    </div>

                   
                   {
                   /*} <div className="text-center">
                      <div className={`text-xl font-bold text-${domain.color}`}>
                        {domain.projects}
                      </div>
                      </div>

                      */
                      }
                     {/*
                      
                      <div className="text-xs text-muted-foreground">Projects</div>
                         */}
                    </div>
                 
                  

                  {/* Skills */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm text-foreground">What they bring:</h4>
                    <div className="flex flex-wrap gap-2">
                      {domain.skills.map((skill, skillIndex) => (
                        <Badge 
                          key={skillIndex}
                          variant="secondary"
                          className="text-xs"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>


                 {/* CTAs */}
                <div className="flex flex-col space-y-2 pt-4">

  
                    {/*<Button 
                      variant="outline" 
                      size="sm"
                      className={`border-${domain.color} text-${domain.color} hover:bg-${domain.color} hover:text-white`}
                    >
                     yaha pr link daalna h!!
                      <Discord className="w-4 h-4 mr-2" />
                      Join WhatsApp
                    </Button>

          
                   
                   <Button 
                      variant="ghost" 
                      size="sm"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <Github className="w-4 h-4 mr-2" />
                      View Projects
                    </Button>*/}
                 
                 

                  </div>
                </CardContent>
              </Card>
            );
          })}
          </div>

        {/* Active Contributors Section */}
        <div className="bg-gradient-secondary/10 rounded-3xl p-8 sm:p-12 border border-accent/20">
          <div className="text-center mb-12">
            <h3 className="font-display font-bold text-3xl sm:text-4xl mb-6 text-foreground">
              Become an Active Contributor
            </h3>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Ready to take your involvement to the next level? Join our GitHub organization 
              and start contributing to real projects that make a difference.
            </p>

            <p className="text-sm text-muted-foreground mt-4">
              [Features : Coming Soon*]
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {contributorFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-6 h-6 text-accent" />
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">
                    {feature.title}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="text-center">
          <Button 
              asChild
              size="lg" 
              variant="outline" 
              className="bg-neon-green hover:bg-neon-purple shadow-neon group"
            >
              <a
              href="https://github.com/ZenYukti"
              target="_blank"
              rel="noopener noreferrer">
              <Github className="w-5 h-5 mr-3" />
              Join GitHub Organization
              <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DomainsPreview;