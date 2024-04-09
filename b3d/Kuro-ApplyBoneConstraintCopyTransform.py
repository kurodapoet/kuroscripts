import bpy

bl_info = {
    "name": "Apply Bone Constraint Copy Transform",
    "author": "Kuro | GPT",
    "version": (1, 0),
    "blender": (4, 1, 0),  # Updated for Blender 4.1
    "location": "3D View > N-panel > Bone Constraint",
    "description": "Apply Bone Constraint Copy Transform between 2 armatures which have same bone but rest pose sucks",
    "warning": "",
    "category": "Animation",
    "module": "Apply_Bone_Constraint_Copy_Transform"  # Update the module name here
}

class BoneConstraintPanel(bpy.types.Panel):
    bl_label = "Apply Bone Constraint Copy Transform"
    bl_idname = "PT_ApplyBoneConstraintCopyTransformConstraintPanel"
    bl_space_type = 'VIEW_3D'
    bl_region_type = 'UI'
    bl_category = 'ApplyBoneConstraint'

    def draw(self, context):
        layout = self.layout

        # Dropdown menu for Source Armature
        layout.prop_search(context.scene, "source_armature", bpy.data, 'objects',text="Source Armature")

        # Dropdown menu for Target Armature
        layout.prop_search(context.scene, "target_armature", bpy.data, 'objects',text="Target Armature")

        layout.operator("object.apply_bone_constraint", text="Apply Copy Transform")

class ApplyBoneConstraintOperator(bpy.types.Operator):
    bl_idname = "object.apply_bone_constraint"
    bl_label = "Apply Bone Constraint Copy Transform"
    
    def execute(self, context):
        # Get selected armatures
        target_armature = context.scene.objects.get(context.scene.target_armature)
        source_armature = context.scene.objects.get(context.scene.source_armature)

        unmatched_bones = []

        if target_armature and source_armature:
            for bone_1 in target_armature.pose.bones:
                if bone_1.name not in source_armature.data.bones:
                    unmatched_bones.append(bone_1.name)
                else:
                    bone_2 = source_armature.pose.bones.get(bone_1.name)
                    if bone_2:
                        copy_transform = bone_1.constraints.new('COPY_TRANSFORMS')
                        copy_transform.target = source_armature
                        copy_transform.subtarget = bone_1.name

            if unmatched_bones:
                self.report({'INFO'}, f"Unmatched bones in Source Armature: {', '.join(unmatched_bones)}")

        return {'FINISHED'}

def register():
    bpy.utils.register_class(BoneConstraintPanel)
    bpy.utils.register_class(ApplyBoneConstraintOperator)
    bpy.types.Scene.target_armature = bpy.props.StringProperty()
    bpy.types.Scene.source_armature = bpy.props.StringProperty()

def unregister():
    bpy.utils.unregister_class(BoneConstraintPanel)
    bpy.utils.unregister_class(ApplyBoneConstraintOperator)
    del bpy.types.Scene.target_armature
    del bpy.types.Scene.source_armature

if __name__ == "__main__":
    register()
